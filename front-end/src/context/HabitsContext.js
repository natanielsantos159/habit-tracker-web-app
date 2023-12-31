import { createContext, useState, useEffect } from "react";
import useCloudStorage from "../hooks/useCloudStorage";
import { v4 as uuidv4 } from 'uuid';

export const HabitsContext = createContext();

export function HabitsContextProvider({children}) {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cloudStorage = useCloudStorage();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    cloudStorage.getArray('habits')
      .then((response) => {
        setHabits(response);
        getMultipleHistories(response.map(({id}) => id))
          .then((res) => {
            setHistory(res);
            setIsLoading(false);
          });
      });
  }, []);
  
  const saveHabit = async (habitInfo) => {
    const { name, icon, color, selectedWeekDays } = habitInfo;
    const newHabit = {
      id: uuidv4(),
      name,
      icon,
      color,
      selectedWeekDays,
    };
    await cloudStorage.pushItem('habits', newHabit);
    const newArray = [newHabit, ...habits];
    setHabits(newArray);
    await cloudStorage.setArray(`${newHabit.id}_success_history`, []);
    await cloudStorage.setArray(`${newHabit.id}_failed_history`, []);
  }

  const updateHabit = async (habitInfo) => {
    const { id, name, icon, color, selectedWeekDays } = habitInfo;
    const newValue = { id, name, icon, color, selectedWeekDays };
    const filterCb = ({id: habitId}) => habitId === id;
    await cloudStorage.updateArrayItem('habits', newValue, filterCb);
    let newArray = [...habits];
    newArray = newArray.map((habit) => {
      if (habit.id === id) {
        return { id, name, icon, color, selectedWeekDays };
      }
      return habit;
    });
    setHabits(newArray);
  }

  const deleteHabit = async (habitId) => {
    await cloudStorage.removeArrayItem('habits', ({id}) => id === habitId);
    await cloudStorage.removeItems(`${habitId}_success_history`, `${habitId}_failed_history`);
    let newArray = [...habits];
    newArray = newArray.filter(({id}) => id !== habitId);
    setHabits(newArray);
  }

  const getHabit = async (habitId) => {
    const habits = await cloudStorage.getArray('habits');
    const foundHabit = habits.find(({ id }) => habitId);
    if (foundHabit) {
      return foundHabit;
    }
  } 

  const getHabitHistory = async (habitId) => {
    const successDaysArray = await cloudStorage.getArray(`${habitId}_success_history`);
    const failedDaysArray = await cloudStorage.getArray(`${habitId}_failed_history`);
    if (successDaysArray && failedDaysArray) {
      return { habitId, successDays: successDaysArray, failedDays: failedDaysArray };
    } else {
      throw new Error('Error while fetching history.');
    }
  }

  const getMultipleHistories = async (habitsIdArray) => {
    const results = await Promise.all(habitsIdArray.map((id) => getHabitHistory(id)));
    return results;
  }

  const updateDayHabitStatus = async ({ habitId, date, success }) => {
    let successDaysArray = await cloudStorage.getArray(`${habitId}_success_history`);
    let failedDaysArray = await cloudStorage.getArray(`${habitId}_failed_history`);
    if (successDaysArray && failedDaysArray) {
      if (success === false) {
        if (successDaysArray.includes(date)) {
          await cloudStorage.removeMultipleArrayItems(`${habitId}_success_history`, (day) => day === date);
          successDaysArray = successDaysArray.filter((day) => day !== date);
        }
        if (!failedDaysArray.includes(date)) {
          await cloudStorage.pushItem(`${habitId}_failed_history`, date);
          failedDaysArray.push(date);
        }
      } else if (success === true) {
        if (failedDaysArray.includes(date)) {
          await cloudStorage.removeMultipleArrayItems(`${habitId}_failed_history`, (day) => day === date);
          failedDaysArray = failedDaysArray.filter((day) => day !== date);
        }

        if (!successDaysArray.includes(date)) {
          await cloudStorage.pushItem(`${habitId}_success_history`, date);
          successDaysArray.push(date);
        }
      }
      setHistory((prevHistory) => {
        const habitHistoryIndex = prevHistory.findIndex(({habitId: id}) => id === habitId);
        const newHistory = [...prevHistory];
        newHistory[habitHistoryIndex] = {
          habitId,
          successDays: successDaysArray,
          failedDays: failedDaysArray,
        };
        return newHistory;
      });
    } else {
      throw new Error('Error while fetching history.');
    }
  }
  const contextValues = {
    habits,
    setHabits,
    isLoading,
    setIsLoading,
    updateDayHabitStatus,
    getHabitHistory,
    saveHabit,
    getHabit,
    updateHabit,
    deleteHabit,
    history,
  }
  return (
    <HabitsContext.Provider value={contextValues}>
      {children}
    </HabitsContext.Provider>
  )
}
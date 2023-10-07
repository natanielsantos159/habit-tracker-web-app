import { createContext, useState, useEffect } from "react";
import useCloudStorage from "../hooks/useCloudStorage";
import { v4 as uuidv4 } from 'uuid';

export const HabitsContext = createContext();

export function HabitsContextProvider({children}) {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cloudStorage = useCloudStorage();

  useEffect(() => {
    cloudStorage.getArray('habits')
      .then((response) => {
        setHabits(response);
        setIsLoading(false);
      });
  }, []);
  
  const saveHabit = async (habitInfo) => {
    const { name, icon, color, selectedWeekDays } = habitInfo;
    const newHabit = {
      id: uuidv4(),
      name,
      icon,
      color,
      selectedWeekDays: Object.entries(selectedWeekDays).reduce((acc, [day, isSelected]) => {
        if (isSelected) acc.push(day);
        return acc;
      }, []),
      history: [],
    };
    await cloudStorage.pushItem('habits', newHabit);
    const newArray = [newHabit, ...habits];
    setHabits(newArray);
  }

  const deleteHabit = async (habitId) => {
    await cloudStorage.removeArrayItem('habits', ({id}) => id === habitId);
    let newArray = [...habits];
    newArray = newArray.filter(({id}) => id !== habitId);
    setHabits(newArray);
  }

  const updateDayHabitStatus = async ({ habitId, date, success }) => {
    const habitsArray = await cloudStorage.getArray('habits');
    const habitIndex = habitsArray.findIndex(({id}) => id === habitId);
    if (habitIndex) {
      const foundHistoryItemIndex = habitsArray[habitIndex].history
        .find((historyItem) => date === historyItem.date);
      if (foundHistoryItemIndex) {
        habitsArray[habitIndex].history[foundHistoryItemIndex].success = success;
      } else {
        const newHistoryItem = { date, success };
        habitsArray[habitIndex].history.push(newHistoryItem);
      }
      await cloudStorage.setArray(habitsArray);
      setHabits(habitsArray);
    } else {
      throw new Error('Habit not found');
    }
  }
  const contextValues = {
    habits,
    setHabits,
    isLoading,
    setIsLoading,
    updateDayHabitStatus,
    saveHabit,
    deleteHabit,
  }
  return (
    <HabitsContext.Provider value={contextValues}>
      {children}
    </HabitsContext.Provider>
  )
}
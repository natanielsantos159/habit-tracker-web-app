import { createContext, useState, useEffect, useContext } from "react";
import { HabitsContext } from "./HabitsContext";
import { useToast } from '@chakra-ui/react';

export const CalendarContext = createContext();

export function CalendarContextProvider({ children, habitId }) {
  const [currentHabitHistory, setCurrentHabitHistory] = useState();
  const [currentHabit, setCurrentHabit] = useState();
  const { getHabitHistory, history, habits, getHabit } = useContext(HabitsContext);
  const toast = useToast();

  useEffect(() => {
    const foundHistory = history.find((item) => habitId === item.habitId);
    if (foundHistory) {
      setCurrentHabitHistory(foundHistory);
    } else {
      getHabitHistory(habitId)
        .then((res) => {
          setCurrentHabitHistory(res);
        })
        .catch((err) => {
          toast({
            title: 'Error',
            description: `Sorry, an error occurred: ${err.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        });
    }

    const foundHabit = habits.find(({id}) => habitId === id);
    if (foundHabit) {
      setCurrentHabit(foundHabit);
    } else {
      getHabit(habitId)
        .then((res) => {
          setCurrentHabit(res);
        })
        .catch((err) => {
          toast({
            title: 'Error',
            description: `Sorry, an error occurred: ${err.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        });
    }
  }, [history, habits]);

  const contextValues = {
    currentHabitHistory,
    setCurrentHabitHistory,
    currentHabit,
    setCurrentHabit
  }

  return (
    <CalendarContext.Provider value={contextValues}>
      {children}
    </CalendarContext.Provider>
  )
}
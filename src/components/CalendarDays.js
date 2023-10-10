import { useContext } from "react";
import { Text, GridItem, Grid } from '@chakra-ui/react';
import DayStateIcon from './DayStateIcon';
import { CalendarContext } from '../context/CalendarContext';

function CalendarDays ({ activeDate, onClick }) {
  const { currentHabitHistory } = useContext(CalendarContext);

  let firstDayOfMonth = new Date(
    activeDate.getFullYear(),
    activeDate.getMonth(),
    1
  );

  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {

      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 6);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay + 1)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === activeDate.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === activeDate.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  const getDayStatus = (calendarDay) => {
    // YYYY-MM-DD format
    const dateString = new Date(calendarDay.date).toISOString().split('T')[0];
    if (currentHabitHistory.successDays.includes(dateString)) {
      return true;
    } else if (currentHabitHistory.failedDays.includes(dateString)) {
      return false;
    } else {
      return undefined;
    }
  }
  return (
    <Grid
      w="100%"
      templateColumns='repeat(7, 1fr)'s
      boxSizing="border-box"
    >
      { currentHabitHistory && currentDays.map((day) => {
        const dayState = getDayStatus(day);
        return (
          <GridItem
            h="42px"
            position="relative"
            border={`0.1px solid (--var-tg-theme-bg-color)`}
            bg={
              day.currentMonth && day.selected
                ? "var(--tg-theme-button-color)"
                : "transparent"
            }
            color={
              day.currentMonth && day.selected
                ? "var(--tg-theme-button-text-color)"
                : "var(--tg-theme-text-color)"
            }
            cursor="pointer"
            onClick={() => onClick(day.number, day.month)}
          >
            { dayState !== undefined && <DayStateIcon isDone={dayState} style={{ margin: "5px", width:"17px", height: "17px"}}/>}
            <Text
              position="absolute"
              right="7px"
              bottom="4px"
              fontSize="sm"
              opacity={!day.currentMonth ? 0.3 : 1}
            >
              {day.number}
            </Text>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default CalendarDays;
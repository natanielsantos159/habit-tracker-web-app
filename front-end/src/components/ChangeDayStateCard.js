import React, { useContext } from 'react';
import { Text, Card, Heading, CardHeader, CardBody, CardFooter, Button, useToast } from "@chakra-ui/react";
import { months, weekDays } from '../consts/consts';
import DayStateIcon from './DayStateIcon';
import { HabitsContext } from '../context/HabitsContext';
import { CalendarContext } from '../context/CalendarContext';

function ChangeDayStateCard({ activeDate }) {
  const { updateDayHabitStatus } = useContext(HabitsContext);
  const toast = useToast();
  const { currentHabitHistory, currentHabit } = useContext(CalendarContext);

  const handleChangeClick = ({ success }) => {
    const date = activeDate.toISOString().split('T')[0];
    updateDayHabitStatus({ habitId: currentHabit.id, date, success })
      .catch((err) => {
        toast({
          title: 'Error',
          description: `Sorry, an error occurred: ${err.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
  }
  
  const getDayStatus = (calendarDay) => {
    // YYYY-MM-DD format
    const dateString = new Date(calendarDay).toISOString().split('T')[0];
    if (currentHabitHistory?.successDays?.includes(dateString)) {
      return true;
    } else {
      return false;
    }
  }

  if (!currentHabit?.selectedWeekDays?.includes(weekDays[activeDate.getDay()])) {
    return null;
  }
  return (
    <Card
      borderRadius="13px"
      bg="var(--tg-theme-secondary-bg-color)"
      textColor="var(--tg-theme-text-color)"
      width="95vw"
    >
      <CardHeader>
        <Heading size='md'>{`${months[activeDate.getMonth()]} ${activeDate.getDate()}, ${activeDate.getFullYear()}`}</Heading>
      </CardHeader>
      <CardBody paddingY="3"> 
        <Text>Did you develop that habit on that day?</Text>
      </CardBody>
      <CardFooter gap={3} paddingY="3">
        <Button 
          variant={getDayStatus(activeDate) ? "solid" : "outline"}
          leftIcon={<DayStateIcon  isDone={true}/>}
          onClick={() => handleChangeClick({ success: true })}
        >
          Yes
        </Button>
        <Button 
          variant={!getDayStatus(activeDate) ? "solid" : "outline"}
          leftIcon={<DayStateIcon isDone={false}/>}
          onClick={() => handleChangeClick({ success: false })}
        >
          No
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ChangeDayStateCard;
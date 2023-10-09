import React, {useEffect, useContext, useState} from 'react';
import { Text, Card, Heading, CardHeader, CardBody, CardFooter, Button, useToast } from "@chakra-ui/react";
import { months } from '../consts/consts';
import DayStateIcon from './DayStateIcon';
import { HabitsContext } from '../context/HabitsContext';
import { useParams } from 'react-router-dom';

function ChangeDayStateCard({ activeDate }) {
  const { getHabitHistory, history, updateDayHabitStatus } = useContext(HabitsContext);
  const [habitHistory, setHabitHistory] = useState();
  const { habitId } = useParams();
  const toast = useToast();

  useEffect(() => {
    const foundHistory = history.find(({id}) => habitId === id);
    if (foundHistory) {
      setHabitHistory(foundHistory);
    } else {
      getHabitHistory(habitId)
        .then((res) => {
          setHabitHistory(res);
        })
        .catch((err) => {
          toast({
            title: 'Error',
            description: `Sorry, an error occurred: ${err.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        })
    }
  }, []);

  const handleChangeClik = (isSuccess) => {
    updateDayHabitStatus(isSuccess)
      .catch((err) => {
        toast({
          title: 'Error',
          description: `Sorry, an error occurred: ${err.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
  }
  
  const getDayStatus = (calendarDay) => {
    // YYYY-MM-DD format
    const dateString = new Date(calendarDay).toISOString().split('T')[0];
    if (habitHistory?.successDays?.includes(dateString)) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Card
      borderRadius="13px"
      bg="var(--tg-theme-secondary-bg-color)"
      textColor="var(--tg-theme-text-color)"
      width="95vw"
      boxShadow={`0 0 99px 0px var(--tg-theme-secondary-bg-color)`}
    >
      <CardHeader>
        <Heading size='md'>{`${months[activeDate.getMonth()]} ${activeDate.getDate()}, ${activeDate.getFullYear()}`}</Heading>
      </CardHeader>
      <CardBody> 
        <Text>Did you develop that habit on that day?</Text>
      </CardBody>
      <CardFooter gap={3}>
        <Button 
          variant={getDayStatus(activeDate) ? "solid" : "outline"}
          leftIcon={<DayStateIcon  isDone={true}/>}
          onClick={() => handleChangeClik(true)}
        >
          Yes
        </Button>
        <Button 
          variant={getDayStatus(activeDate) ? "solid" : "outline"}
          leftIcon={<DayStateIcon isDone={false}/>}
          onClick={() => handleChangeClik(false)}
        >
          No
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ChangeDayStateCard;
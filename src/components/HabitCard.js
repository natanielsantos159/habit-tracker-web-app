import {
  Grid,
  GridItem,
  Text,
  Box,
  IconButton,
  Flex,
  useToast,
} from '@chakra-ui/react';
import DayStateIcon from './DayStateIcon';
import deleteIcon from '../assets/delete.png';
import { useState, useEffect, useContext } from 'react';
import { getWeekDates } from '../utils/getWeekDates';
import HabitIcon from './HabitIcon';
import { HabitsContext } from '../context/HabitsContext';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';

function HabitCard({ habitInfo }) {
  const { id, color, icon, name, selectedWeekDays } = habitInfo;
  const [weekDates] = useState(getWeekDates());
  const { getHabitHistory, updateDayHabitStatus, deleteHabit } = useContext(HabitsContext);
  const toast = useToast();
  const { webApp } = useTelegramWebApp();
  const [historyIsLoading, setHistoryIsLoading] = useState(true);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    getHabitHistory(id)
      .then((response) => {
        setHistory(response);
        setHistoryIsLoading(false);
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: `Sorry, an error occurred: ${err.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
  }, []);

  const changeDayState = async (date, newValue) => {
    try {
      await updateDayHabitStatus({ habitId: id, date, success: newValue })
    } catch (err) {
      toast({
        title: 'Error',
        description: `Sorry, an error occurred: ${err.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleDeleteHabit = () => {
    webApp.showConfirm("Are you sure you want to deleted this habit?", (response) => {
      if (response === true) {
        deleteHabit(id)
          .then(() => {
            toast({
              title: 'Success',
              description: `Habit deleted successfully`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
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
    })
  }
  return (
    <Box textColor="var(--tg-theme-text-color)" marginY="4" position="relative">
      <Flex justifyContent="space-between" marginBottom="3" gap="4" alignItems="center">
        <IconButton bg={color} icon={<HabitIcon iconName={icon} fill="var(--tg-theme-button-text-color)" />} />
        <Text
          fontSize="xl"
          css={{ fontWeight: '300' }}
        >{name}</Text>
        <IconButton
          marginLeft="auto"
          icon={<img src={deleteIcon} alt="Trash icon" height={20} width={20} />}
          onClick={handleDeleteHabit}
          aria-label='Delete Habit'
          variant='ghost'
          _hover={{ background: 'transparent' }}
        />
      </Flex>
      <Grid
        templateColumns='repeat(7, 1fr)'
        borderRadius='6px'
        bg='var(--tg-theme-secondary-bg-color)'
        padding='2'
        placeItems="center"
      >
        {!historyIsLoading && weekDates.map(({ day, date }) => {
          if (selectedWeekDays.includes(day) === false) return (<GridItem></GridItem>);
          let success;
          if (history.successDays.includes(date)) success = true;
          if (history.failedDays.includes(date)) success = false;
          const isToday = date === new Date().toISOString().split('T')[0];
          return (
            <GridItem 
              placeItems="center"
              fontSize="xs"
              onClick={() => changeDayState(date, !success)}
              cursor="pointer"
              padding="3px 9px"
              borderRadius="inherit"
              background={isToday ? '#00000030' : 'transparent' }
            >
              {day}
              <DayStateIcon isDone={success} />
            </GridItem>
          )
        })}
      </Grid>
    </Box>
  );
}

export default HabitCard;
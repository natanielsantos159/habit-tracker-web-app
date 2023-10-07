import React from 'react';
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
import { useState, useContext } from 'react';
import { getWeekDates } from '../utils/getWeekDates';
import HabitIcon from './HabitIcon';
import { HabitsContext } from '../context/HabitsContext';

function HabitCard({ habitInfo }) {
  const { id, color, icon, name, history, selectedWeekDays } = habitInfo;
  const [weekDates] = useState(getWeekDates());
  const { updateDayHabitStatus } = useContext(HabitsContext);
  const toast = useToast();

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
          aria-label='Delete Habit'
          variant='ghost'
        />
      </Flex>
      <Grid
        templateColumns='repeat(7, 1fr)'
        borderRadius='6px'
        bg='var(--tg-theme-secondary-bg-color)'
        padding='2'
        placeItems="center"
      >
        {weekDates.map(({ day }) => (
          <GridItem placeItems="center" fontSize="xs">{day}</GridItem>
        ))}
        {weekDates.map(({ day, date }) => {
          const foundItem = history.find((item) => item.date === date && selectedWeekDays.includes(day));
          let result;
          if (foundItem) result = foundItem.success;
          return <DayStateIcon isDone={result} onClick={() => changeDayState(date, !result)} />
        })}
      </Grid>
    </Box>
  );
}

export default HabitCard;
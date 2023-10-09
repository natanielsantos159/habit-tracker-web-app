import {
  Grid,
  GridItem,
  Text,
  Box,
  IconButton,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { ReactComponent as DeleteIcon} from '../assets/delete.svg';
import { useState, useContext } from 'react';
import { getWeekDates } from '../utils/getWeekDates';
import HabitIcon from './HabitIcon';
import { HabitsContext } from '../context/HabitsContext';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import HabitDayGridItem from './HabitDayGridItem';
import { useNavigate } from 'react-router-dom';

function HabitCard({ habitInfo }) {
  const { id, color, icon, name, selectedWeekDays } = habitInfo;
  const [weekDates] = useState(getWeekDates());
  const { isLoading, history, updateDayHabitStatus, deleteHabit } = useContext(HabitsContext);
  const toast = useToast();
  const { webApp } = useTelegramWebApp();
  const habitHistory = history.find(({ habitId }) => habitId === id) || {};
  const navigate = useNavigate();

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

  const handleHabitCardClick = () => {
    navigate(`/habits/${id}`)
  }

  return (
    <Box textColor="var(--tg-theme-text-color)" marginY="4" position="relative">
      <Flex 
        cursor="pointer"
        justifyContent="space-between"
        marginBottom="3"
        gap="4"
        alignItems="center"
      >
        <IconButton bg={color} icon={<HabitIcon iconName={icon} fill="var(--tg-theme-button-text-color)" />} />
        <Text
          onClick={handleHabitCardClick}
          fontSize="xl"
          css={{ fontWeight: '300' }}
        >{name}</Text>
        <IconButton
          marginLeft="auto"
          icon={<DeleteIcon stroke="#f54561" />}
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
        {!isLoading && weekDates.map(({ day, date }) => {
          if (selectedWeekDays.includes(day) === false) return (<GridItem></GridItem>);
          let success;
          if (habitHistory.successDays?.includes(date)) success = true;
          if (habitHistory.failedDays?.includes(date)) success = false;
          const isToday = date === new Date().toISOString().split('T')[0];
          return (
            <HabitDayGridItem 
              day={day}
              onClick={(newValue) => updateDayHabitStatus({ habitId: id, date, success: newValue })}
              isToday={isToday}
              success={success}
            />
          )
        })}
      </Grid>
    </Box>
  );
}

export default HabitCard;
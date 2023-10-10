import React, { useContext } from 'react';
import { ReactComponent as DeleteIcon} from '../assets/delete.svg';
import { ReactComponent as EditIcon} from '../assets/edit.svg';
import HabitIcon from '../components/HabitIcon';
import { Text, Flex, IconButton, useToast } from '@chakra-ui/react';
import { CalendarContext } from '../context/CalendarContext';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import { HabitsContext } from '../context/HabitsContext';
import { useNavigate } from 'react-router-dom';

function HabitDetailHeader(props) {
  const { currentHabit } = useContext(CalendarContext);
  const { webApp } = useTelegramWebApp();
  const { deleteHabit } = useContext(HabitsContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleDeleteHabit = () => {
    webApp.showConfirm("Are you sure you want to deleted this habit?", (response) => {
      if (response === true) {
        deleteHabit(currentHabit.id)
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

  const handleEditHabit = () => {
    navigate(`/habits/${currentHabit.id}/edit`, { state: { habitInfo: currentHabit }});
  }

  return (
    <>
      { currentHabit && (
          <Flex
            justifyContent="center"
            margin="3"
            gap="4"
            alignItems="center"
          >
            <IconButton
              bg={currentHabit.color}
              icon={<HabitIcon iconName={currentHabit.icon}
              fill="var(--tg-theme-button-text-color)" />}
            />
            <Text
              fontSize="xl"
              css={{ fontWeight: '300' }}
            >
              {currentHabit.name}
            </Text>

            <IconButton
              marginLeft="auto"
              icon={<EditIcon stroke="var(--tg-theme-text-color)" />}
              onClick={handleEditHabit}
              aria-label='Edit Habit'
              variant='ghost'
              _hover={{ background: 'transparent' }}
            />
            <IconButton
              icon={<DeleteIcon stroke="#f54561" />}
              onClick={handleDeleteHabit}
              aria-label='Delete Habit'
              variant='ghost'
              _hover={{ background: 'transparent' }}
            />
          </Flex>
        )}
    </>
  );
}

export default HabitDetailHeader;
import { Stack, Center, Text, Flex, IconButton, useToast } from '@chakra-ui/react';
import { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from '../components/Calendar';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import { HabitsContext } from '../context/HabitsContext';
import HabitIcon from '../components/HabitIcon';
import { ReactComponent as DeleteIcon} from '../assets/delete.svg';

function HabitDetail() {
  const [habitInfo, setHabitInfo] = useState();
  const { webApp } = useTelegramWebApp();
  const navigate = useNavigate();
  const { habits, getHabit, deleteHabit } = useContext(HabitsContext);
  const { habitId } = useParams();
  const toast = useToast();

  useEffect(() => {
    const foundHabit = habits.find((id) => habitId === id);
    if (foundHabit) {
      setHabitInfo(foundHabit);
    } else {
      getHabit(habitId).then((res) => setHabitInfo(res));
    }

    if (!webApp.BackButton.isVisible) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => navigate('/'));
    }

    return () => {
      webApp.BackButton.hide();
    }
  }, []);

  const handleDeleteHabit = () => {
    webApp.showConfirm("Are you sure you want to deleted this habit?", (response) => {
      if (response === true) {
        deleteHabit(habitInfo.id)
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
    <Center>
      <Stack>
        { habitInfo && (
          <Flex
            justifyContent="center"
            margin="3"
            gap="4"
            alignItems="center"
          >
            <IconButton
              bg={habitInfo.color}
              icon={<HabitIcon iconName={habitInfo.icon} fill="var(--tg-theme-button-text-color)" />}
            />
            <Text
              fontSize="xl"
              css={{ fontWeight: '300' }}
            >
              {habitInfo.name}
            </Text>

            <IconButton
              marginLeft="auto"
              icon={<DeleteIcon stroke="#f54561" />}
              onClick={handleDeleteHabit}
              aria-label='Delete Habit'
              variant='ghost'
              _hover={{ background: 'transparent' }}
            />
          </Flex>
        )}
        <Calendar />
      </Stack>
    </Center>
  );
}

export default HabitDetail;
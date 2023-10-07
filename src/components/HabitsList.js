import {
  Text,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { useContext } from 'react';
import HabitCard from './HabitCard';
import { HabitsContext } from '../context/HabitsContext';

function HabitsList() {
  const { habits, isLoading } = useContext(HabitsContext);

  return (
    <>
      {!habits ||
        (habits.length === 0 && (
          <Text textColor="var(--tg-theme-hint-color)" fontSize="xl" textAlign="center" m="10">No habits yet.</Text>
        ))
      }
      {isLoading && <Box position="relative"><Spinner size='md' position="fixed" left="50%"/></Box>}
      {habits && Array.isArray(habits) && habits.map((habitInfo, i) => (
        <HabitCard habitInfo={habitInfo} />
      ))}
    </>
  );
}

export default HabitsList;
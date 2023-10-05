import { 
  Grid,
  GridItem,
  Text,
  Box,
  IconButton,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import DayState from '../components/DayState';
import deleteIcon from '../assets/delete.png';
import useCloudStorage from '../hooks/useCloudStorage';
import { useState, useEffect } from 'react';
import { getWeekDates } from '../utils/getWeekDates';

function HabitsList(props) {
  const [habits, setHabits] = useState(null);
  const cloudStorage = useCloudStorage();
  const [weekDates] = useState(getWeekDates());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cloudStorage.get('habits')
      .then((response) => {
        setHabits(response);
        setIsLoading(false);
      })
  }, []);
  return (
    <>
        {habits === null ||
          (Object.keys(habits).length === 0 && (
            <Text textColor="var(--tg-theme-hint-color)" fontSize="xl" textAlign="center" m="10">No habits yet.</Text>
          ))
        }
        { isLoading && <Spinner size='sm' />}
        {habits !== null &&
          Object.entries(habits).map(({ name, history, selectedWeekDays }) => (
            <Box textColor="var(--tg-theme-text-color)">
              <Flex justifyContent="space-between">
                <Text
                  fontSize="xl"
                  css={{ fontWeight: '300' }}
                >{name}</Text>
                <IconButton
                  icon={<img src={deleteIcon} alt="Trash icon" height={20} width={20} />}
                  aria-label='Delete Habit'
                  variant='ghost'
                />
              </Flex>
              <Grid
                templateColumns='repeat(7, 1fr)'
                borderRadius='6px'
                bg='var(--tg-theme-bg-color)'
                padding='2'
                marginBottom="5"
                placeItems="center"
              >
                {weekDates.map(({day}) => (
                  <GridItem placeItems="center" fontSize="xs">{day}</GridItem>
                ))}
                {weekDates.map(({day, date}) => {
                  const foundItem = history.some((item) => item.day === day && item.date === date && selectedWeekDays.includes(day));
                  let result;
                  if (foundItem) result = foundItem.success;
                  return <DayState isDone={result} />
                })}

              </Grid>
            </Box>
          ))}
    </>
  );
}

export default HabitsList;
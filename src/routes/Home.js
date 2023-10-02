import React from 'react';
import deleteIcon from '../assets/delete.png';
import DayState from '../components/DayState';
import { Grid, GridItem, Text, Box, Container, IconButton, Flex } from '@chakra-ui/react';

function Home() {
  const habits = { 
    "Drink water": {
      "2023-10-01": true,
      "2023-10-02": true,
      "2023-10-03": true,
      "2023-10-04": false,
      "2023-10-05": true,
    },
    "Drink water5": {
      "2023-10-01": true,
      "2023-10-02": true,
      "2023-10-03": true,
      "2023-10-04": false,
      "2023-10-05": true,
    },
    "Drink water4": {
      "2023-10-01": true,
      "2023-10-02": true,
      "2023-10-03": true,
      "2023-10-04": false,
      "2023-10-05": true,
    },
  };
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Container marginTop="10">
      {habits === null ||
        (Object.keys(habits).length === 0 && (
          <Text textColor="var(--tg-theme-hint-color)" fontSize="xl" textAlign="center" m="10">No habits yet.</Text>
        ))
      }
      {habits !== null && 
      Object.entries(habits).map(([habit, habitStreak]) => (
        <Box textColor="var(--tg-theme-text-color)">
          <Flex justifyContent="space-between">
            <Text
              fontSize="xl"
              css={{ fontWeight: '300' }}
            >{habit}</Text>
            <IconButton 
              icon={<img src={deleteIcon} alt="Trash icon" height={20} width={20} />}
              aria-label='Delete Habit'
              variant='ghost'
              colorScheme=''
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
            { weekDays.map((day) => (
              <GridItem placeItems="center" fontSize="xs">{day}</GridItem>
            ))}
            { weekDays.map((day) => (
              <DayState isDone={true} />
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
}

export default Home;
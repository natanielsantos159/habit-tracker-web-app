import React, { useEffect, useState } from 'react';
import { Input, Container, Text, SimpleGrid, Button, Box, Flex } from '@chakra-ui/react';
import IconsModal from '../components/IconsModal';

const webApp = window.Telegram.WebApp;

function NewHabit() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [name, setName] = useState();
  const [selectedWeekDays, setSelectedWeekDays] = useState(weekDays.map(() => false));

  useEffect(() => {
    if (!webApp.isExpanded) {
      webApp.expand();
    }
  }, []);

  const handleSelectDays = (index) => {
    const newSelectedWeekDays = [...selectedWeekDays];
    newSelectedWeekDays[index] = selectedWeekDays[index] === false ? true : false;
    setSelectedWeekDays(newSelectedWeekDays);
  }
  return (
    <Container>
      <Text fontSize="2xl" textAlign="center" css={{ fontWeight: 700 }} paddingY="10">New habit</Text>

      <Flex gap={3} alignItems="center">
        <Box>
          <IconsModal />
        </Box>
        <Box minWidth="75vw">
          <Text fontSize="small" fontWeight="semibold">Habit name:</Text>
          <Input
            variant='flushed'
            placeholder='e.g. Meditate for 15 minutes'
            size="sm"
            marginBottom="3"
            value={name}
            onChange={(event) => setName(event.target.value)}
            />
        </Box>
      </Flex>

      <Text fontSize="small" fontWeight="semibold">Frenquency:</Text>
      <SimpleGrid columns={7} rows={1} height="1.5">
        {weekDays.map((day, index) => (
          <Button
            variant={selectedWeekDays[index] ? "solid" : "outline"}
            key={index}
            size="small"
            onClick={() => handleSelectDays(index)}>
            {day}
          </Button>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default NewHabit;
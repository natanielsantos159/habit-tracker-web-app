import React, { useEffect, useState } from 'react';
import { Input, Container, Text, SimpleGrid, Button, Box, Flex, useRadioGroup } from '@chakra-ui/react';
import IconsModal from '../components/IconsModal';
import { useNavigate } from 'react-router-dom';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import RadioColor from '../components/RadioColor';

function NewHabit() {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const habitColors = [
    'var(--tg-theme-button-color)',
    '#34c9eb',
    '#00d87e',
    '#b500ff',
    '#f3c912',
    '#ff6c40',
    '#ff005f'
  ];
  const [name, setName] = useState('');
  const [currentIcon, setCurrentIcon] = useState('bookmark');
  const [color, setColor] = useState('var(--tg-theme-button-color)');
  const [selectedWeekDays, setSelectedWeekDays] = useState({
    Sun: false, Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false
  });
  const navigate = useNavigate();
  const webApp = useTelegramWebApp();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'habitColor',
    defaultValue: 'var(--tg-theme-button-color)',
    onChange: setColor,
  })
  const group = getRootProps();

  useEffect(() => {
    if (!webApp.isExpanded) {
      webApp.expand();
    }
    if (!webApp.BackButton.isVisible) {
      webApp.BackButton.show()
      webApp.BackButton.onClick(() => {
        navigate('/');
        webApp.BackButton.hide();
      })
    }

    webApp.MainButton.setParams({
      text: 'Save Habit',
      is_visible: true,
      is_active: false,
    })
  }, []);

  useEffect(() => {
    // Enable main button if name is not empty
    if (name !== '' && webApp.MainButton.isActive === false) {
      webApp.MainButton.enable()
    }
  }, [name, webApp.MainButton]);


  const handleSelectDays = (day) => {
    const selectedDaysObjCopy = {...selectedWeekDays};
    selectedDaysObjCopy[day] = selectedWeekDays[day] ? false : true;
    setSelectedWeekDays(selectedDaysObjCopy);
  }

  return (
    <Container>
      <Text fontSize="2xl" textAlign="center" css={{ fontWeight: 700 }} paddingY="10">New habit</Text>

      <Flex gap={3} alignItems="center" marginY="3">
        <Box>
          <IconsModal currentIcon={currentIcon} currentColor={color} onClick={setCurrentIcon}/>
        </Box>
        <Box minWidth="75vw">
          <Text fontSize="small" fontWeight="semibold">Habit name:</Text>
          <Input
            variant='flushed'
            placeholder='e.g. Meditate for 15 minutes'
            size="sm"
            onChange={(event) => setName(event.target.value)}
            />
        </Box>
      </Flex>

      <Text fontSize="small" fontWeight="semibold">Color:</Text>
      <SimpleGrid marginY="3" columns={7} rows={1} gap={3} {...group}>
        {habitColors.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioColor key={value} color={value} {...radio}>
              {value}
            </RadioColor>
          )  
        })}
      </SimpleGrid>
      <Text fontSize="small" fontWeight="semibold">Frenquency:</Text>
      <SimpleGrid columns={7} rows={1} height="1.5" gap={1} marginY="3">
        {weekDays.map((day, index) => (
          <Button
            variant={selectedWeekDays[day] ? "solid" : "outline"}
            key={index}
            size="small"
            onClick={() => handleSelectDays(day)}>
            {day}
          </Button>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default NewHabit;
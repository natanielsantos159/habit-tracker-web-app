import React, { useContext, useEffect, useState } from 'react';
import { Input, Container, Text, SimpleGrid, Button, Box, Flex, useRadioGroup, useToast } from '@chakra-ui/react';
import IconsModal from '../components/IconsModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import RadioColor from '../components/RadioColor';
import { HabitsContext } from '../context/HabitsContext';
import { weekDays, habitColors } from '../consts/consts';

function EditHabit() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentHabit = location.state.habitInfo;
  const { updateHabit } = useContext(HabitsContext);
  const [name, setName] = useState(currentHabit.name || '');
  const [currentIcon, setCurrentIcon] = useState(currentHabit.icon);
  const [color, setColor] = useState(currentHabit.color);
  const [selectedWeekDays, setSelectedWeekDays] = useState(currentHabit.selectedWeekDays);
  const toast = useToast();
  const { webApp } = useTelegramWebApp();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'habitColor',
    defaultValue: currentHabit.color,
    onChange: setColor,
  });

  const group = getRootProps();

  useEffect(() => {
    if (!location?.state?.habitInfo) {
      navigate('/');
    }
    if (!webApp.isExpanded) {
      webApp.expand();
    }
    if (!webApp.BackButton.isVisible) {
      webApp.BackButton.show()
    }
    const backBtnCb = () => {
      webApp.showConfirm("Are you sure you want to discard your changes?", (answer) => {
        if (answer === true) navigate(`/habits/${currentHabit.id}`);
      })
    };
    webApp.BackButton.onClick(backBtnCb)

    webApp.MainButton.setParams({
      color: "#6b6767",
      text: 'Save changes',
      is_visible: true,
      is_active: false,
    });

    webApp.enableClosingConfirmation()

    // This will be called when the component is unmounted
    return () => {
      // Removes the previous Back Button callback
      webApp.BackButton.offClick(backBtnCb);
      if (webApp.MainButton.isVisible) {
        webApp.MainButton.hide();
      }
    }
  }, []);

  const handleSaveHabit = ({ id, name, icon, color, selectedWeekDays}) => {
    updateHabit({
      id,
      name,
      icon,
      color,
      selectedWeekDays,
    })
      .then(() => {
        navigate(`/habits/${currentHabit.id}`, { state: { edited: true } });
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

  useEffect(() => {
    // Enable main button if name and selected week days is not empty
    const formIsValid = name !== '' && selectedWeekDays.length > 0;
    if (formIsValid && webApp.MainButton.isActive === false) {
      webApp.MainButton.setParams({
        is_active: true,
        text: 'Save changes',
        color: false, // Setting to false so the theme color is used
      });
    } else if (!formIsValid && webApp.MainButton.isActive) {
      webApp.MainButton.setParams({
        is_active: false,
        text: 'Save changes',
        color: "#6b6767",
      });
    }

    // Updates main button onClick function with the current state 
    const mainButtonCb = () => handleSaveHabit({
      id: currentHabit.id, name, icon: currentIcon, color, selectedWeekDays
    });
    webApp.MainButton.onClick(mainButtonCb);

    // Removes the previous callback before setting a new one
    return () => {
      webApp.MainButton.offClick(mainButtonCb);
    }
  }, [name, currentIcon, color, selectedWeekDays, webApp.MainButton]);


  const handleSelectDays = (day) => {
    const arrCopy = [...selectedWeekDays];
    const itemIndex = selectedWeekDays.indexOf(day);
    if (itemIndex > -1) {
      arrCopy.splice(itemIndex, 1);
    } else {
      arrCopy.push(day);
    }
    setSelectedWeekDays(arrCopy);
  }

  return (
    <Container>
      <Text fontSize="2xl" textAlign="center" css={{ fontWeight: 700 }} paddingY="10">Edit habit</Text>

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
            value={name}
            type="text"
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
            variant={selectedWeekDays.includes(day) ? "solid" : "outline"}
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

export default EditHabit;
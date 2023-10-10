import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import ChangeDayStateCard from '../components/ChangeDayStateCard';
import HabitDetailHeader from '../components/HabitDetailHeader';
import { Center, Stack, useToast } from '@chakra-ui/react';
import { useParams, useLocation } from "react-router-dom";
import { CalendarContextProvider } from '../context/CalendarContext';

function HabitDetail() {
  const [activeDate, setActiveDate] = useState(new Date());
  const { webApp } = useTelegramWebApp();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { habitId } = useParams();

  useEffect(() => {
    if (location.state && location.state.edited) {
      toast({
        title: 'Habit saved',
        description: 'Your changes has been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }

    if (!webApp.BackButton.isVisible) {
      webApp.BackButton.show();
    }

    const backBtnCb = () => {
      navigate('/');
      webApp.BackButton.hide();
    };

    webApp.BackButton.onClick(backBtnCb);

    return () => {
      webApp.BackButton.offClick(backBtnCb);
    }
  }, []);


  const onDateClick = (day, month) => {
    if (typeof day !== 'string' && day !== -1) {
      let newDate = new Date(activeDate.setMonth(month));
      newDate = new Date(activeDate.setDate(day));
      setActiveDate(newDate);
    }
  };

  return (
    <CalendarContextProvider habitId={habitId}>
      <Center>
        <Stack>
          <HabitDetailHeader />
          <Calendar activeDate={activeDate} onDateClick={onDateClick} />
          <ChangeDayStateCard activeDate={activeDate} />;
        </Stack>
      </Center>
    </CalendarContextProvider>
  );
}

export default HabitDetail;
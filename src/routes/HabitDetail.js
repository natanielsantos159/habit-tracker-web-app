import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import ChangeDayStateCard from '../components/ChangeDayStateCard';
import HabitDetailHeader from '../components/HabitDetailHeader';
import { Center, Stack } from '@chakra-ui/react';
import { useParams } from "react-router-dom";
import { CalendarContextProvider } from '../context/CalendarContext';

function HabitDetail() {
  const [activeDate, setActiveDate] = useState(new Date());
  const { webApp } = useTelegramWebApp();
  const navigate = useNavigate();
  const { habitId } = useParams();

  useEffect(() => {
    if (!webApp.BackButton.isVisible) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => navigate('/'));
    }

    return () => {
      webApp.BackButton.hide();
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
import { Box, Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/Calendar';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';

function HabitDetail() {
  const { webApp } = useTelegramWebApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!webApp.BackButton.isVisible) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => navigate('/'));
    }

    return () => {
      webApp.BackButton.hide();
    }
  }, []);

  return (
    <Center>
      <Box>
        <Calendar />
      </Box>
    </Center>
  );
}

export default HabitDetail;
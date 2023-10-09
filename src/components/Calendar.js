import { Box } from '@chakra-ui/react';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';

function Calendar ({activeDate, onDateClick }) {
  return (
    <Box>
      <Box
        width="95vw"
        maxWidth="500px"
        bg="var(--tg-theme-secondary-bg-color)"
        borderRadius="13px"
        boxShadow={`0 0 99px 0px var(--tg-theme-secondary-bg-color)`}
        mb="10"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <CalendarHeader activeDate={activeDate} onClick={onDateClick} />
        <CalendarDays activeDate={activeDate} onClick={onDateClick} />
      </Box>
    </Box>
  );
};

export default Calendar;
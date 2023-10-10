import { Box, SimpleGrid } from '@chakra-ui/react';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import { weekDays } from '../consts/consts';

function Calendar ({activeDate, onDateClick }) {
  return (
    <Box>
      <Box
        width="95vw"
        maxWidth="500px"
        bg="var(--tg-theme-secondary-bg-color)"
        borderRadius="13px"
        mb="10"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <CalendarHeader activeDate={activeDate} onClick={onDateClick} />
        <SimpleGrid columns={7} spacing={0} >
          { weekDays.map((day) => (
            <Box
              key={day}
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="sm"
              fontWeight="300"
              color="var(--tg-theme-text-color)"
              height="40px"
              width="100%"
              bg="var(--tg-theme-secondary-bg-color)"
            >
              {day}
            </Box>
          ))}
        </SimpleGrid>
        <CalendarDays activeDate={activeDate} onClick={onDateClick} />
      </Box>
    </Box>
  );
};

export default Calendar;
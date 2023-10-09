import { Box } from '@chakra-ui/react';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import { useState } from 'react';

function Calendar () {
  const [activeDate, setActiveDate] = useState(new Date());

  const onClickDate = (day, month) => {
    if (typeof day !== 'string' && day !== -1) {
      let newDate = new Date(activeDate.setMonth(month));
      newDate = new Date(activeDate.setDate(day));
      setActiveDate(newDate);
    }
  };

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
        <CalendarHeader activeDate={activeDate} onClick={onClickDate} />
        <CalendarDays activeDate={activeDate} onClick={onClickDate} />
      </Box>
    </Box>
  );
};

export default Calendar;
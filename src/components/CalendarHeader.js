import { Box, Text } from '@chakra-ui/react';
import { months } from '../consts/consts';
import ButtonNext from './ButtonNext';
import ButtonPrevious from './ButtonPrevious';

const CalendarHeader = ({ activeDate, onClick }) => {
  const today = new Date();

  return (
    <Box
      h="100%"
      display="flex"
      justifyContent="space-between"
      fontSize="medium"
      alignItems="center"
    >
      <Box h="100%" w="100%" display="flex" alignItems="center">
        <Text marginLeft="31px">{`${
          months[activeDate.getMonth()]
        }`}</Text>
        <Text marginLeft="5px">{`${activeDate.getFullYear()}`}</Text>
      </Box>
      <Box display="flex" alignItems="center" marginRight="22px">
        <ButtonPrevious activeDate={activeDate} onClick={onClick} />
        <Text
          margin="22px"
          color="var(--tg-theme-text-color)"
          cursor="pointer"
          onClick={() => onClick(today.getDate(), today.getMonth())}
        >
          Today
        </Text>
        <ButtonNext activeDate={activeDate} onClick={onClick} />
      </Box>
    </Box>
  );
};

export default CalendarHeader;
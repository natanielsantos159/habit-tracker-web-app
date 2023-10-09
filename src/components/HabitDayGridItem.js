import React, { useState } from 'react';
import {
  GridItem,
  useToast
} from '@chakra-ui/react';
import DayStateIcon from './DayStateIcon';

function HabitDayGridItem({ onClick, isToday, day, success }) {
  const [isSuccess, setIsSuccess] = useState(success);
  const toast = useToast();

  const handleClick = () => {
    setIsSuccess((prev) => {
      onClick(!prev)
        .catch((err) => {
          setIsSuccess((prev) => !prev);
          toast({
            title: 'Error',
            description: `Sorry, an error occurred: ${err.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        })
      
      return !prev;
    });
  }
  return (
    <GridItem
      placeItems="center"
      fontSize="xs"
      onClick={handleClick}
      cursor="pointer"
      padding="3px 9px"
      borderRadius="inherit"
      background={isToday ? '#00000030' : 'transparent'}
    >
      {day}
      <DayStateIcon isDone={isSuccess} />
    </GridItem>
  );
}

export default HabitDayGridItem;
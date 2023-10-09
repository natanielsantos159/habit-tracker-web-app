import { Box, Center } from '@chakra-ui/react';
import Calendar from '../components/Calendar';

function HabitDetail(props) {
  return (
    <Center>
      <Box>
        <Calendar />
      </Box>
    </Center>
  );
}

export default HabitDetail;
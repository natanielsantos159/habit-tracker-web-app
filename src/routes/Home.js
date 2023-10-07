import React, {useEffect} from 'react';
import logo from '../assets/logo.png';
import { 
  Button,
  Container,
  Flex,
  Image,
  useToast
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import HabitsList from '../components/HabitsList';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (location.state && location.state.newHabit) {
      toast({
        title: 'Habit saved',
        description: 'Your new habit has been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, []);

  const addHabitOnClick = () => {
    navigate('/new-habit');
  };

  return (
    <>
      <header>
        <Image src={logo} marginTop="2.5rem" alt="logo" width={200} />
      </header>
      <Container marginTop="10">
        <Flex justifyContent="flex-end" paddingY="2">
          <Button
            variant="solid"
            onClick={addHabitOnClick}
          >
            Add new habit
          </Button>
        </Flex>
        <HabitsList />
      </Container>
    </>
  );
}

export default Home;
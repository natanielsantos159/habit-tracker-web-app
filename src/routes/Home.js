import React from 'react';
import logo from '../assets/logo.png';
import { 
  Button,
  Container,
  Flex,
  Image
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import HabitsList from '../components/HabitsList';

function Home() {
  const navigate = useNavigate();

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
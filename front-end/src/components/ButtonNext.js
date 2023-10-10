import { IconButton } from '@chakra-ui/react';
import { ReactComponent as IconNext } from '../assets/arrow-right.svg';

function ButtonNext ({ activeDate, onClick }) {
  return (
    <IconButton
      aria-label="Next"
      _css={{ backgroundColor: "var(--tg-theme-button-bg-color)" }}
      variant="solid"
      isRound
      size="sm"
      fontSize="15px"
      icon={<IconNext stroke="var(--tg-theme-button-text-color)"/>}
      onClick={() => onClick(activeDate.getDate(), activeDate.getMonth() + 1)}
    ></IconButton>
  );
};

export default ButtonNext;
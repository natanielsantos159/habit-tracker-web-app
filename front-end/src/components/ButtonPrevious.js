import { IconButton } from '@chakra-ui/react';
import { ReactComponent as IconPrevious } from '../assets/arrow-left.svg';

function ButtonPrevious ({ activeDate, onClick }) {
  return (
    <IconButton
      aria-label="Previous"
      _css={{ backgroundColor: "var(--tg-theme-button-bg-color)" }}
      variant="solid"
      isRound
      size="sm"
      fontSize="15px"
      icon={<IconPrevious stroke="var(--tg-theme-button-text-color)"/>}
      onClick={() => onClick(activeDate.getDate(), activeDate.getMonth() - 1)}
    ></IconButton>
  );
};

export default ButtonPrevious;
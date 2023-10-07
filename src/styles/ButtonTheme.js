import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const outline = defineStyle({
  border: '2px solid var(--tg-theme-button-color)',
  borderRadius: '1rem',
  fontWeight: 'semibold',
  textColor: 'var(--tg-theme-button-color)',
  borderColor: 'var(--tg-theme-button-color)',
  backgroundColor: 'transparent',
  _hover: {
    backgroundColor: 'transparent',
    textColor: 'var(--tg-theme-button-color)',
  },
  _active: {
    backgroundColor: 'var(--tg-theme-button-color)',
    textColor: 'var(--tg-theme-button-text-color)',
  },
});
const solid = defineStyle({
  border: '2px solid transparent',
  borderRadius: '1rem',
  fontWeight: 'semibold',
  textColor: 'var(--tg-theme-button-text-color)',
  backgroundColor: 'var(--tg-theme-button-color)',
  _hover: {
    backgroundColor: 'var(--tg-theme-button-color)',
    textColor: 'var(--tg-theme-button-text-color)',
  },
  _active: {
    backgroundColor: 'var(--tg-theme-button-color)',
    textColor: 'var(--tg-theme-button-text-color)',
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { outline, solid },
});
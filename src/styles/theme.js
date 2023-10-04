import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const outline = defineStyle({
  border: '2px solid var(--tg-theme-button-color)',
  borderRadius: '1rem',
  fontWeight: 'semibold',
  textColor: 'var(--tg-theme-button-color)',
  borderColor: 'var(--tg-theme-button-color)',
  backgroundColor: 'transparent',
  _hover: {
    backgroundColor: 'var(--tg-theme-button-color)',
    textColor: 'var(--tg-theme-button-text-color)',
  },
  _active: {
    backgroundColor: 'var(--tg-theme-button-color)',
    textColor: 'var(--tg-theme-button-text-color)',
  },
});
const solid = defineStyle({
  border: '2px solid var(--tg-theme-button-color)',
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


const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const telegramTheme = definePartsStyle({
  dialog: {
    bg: 'var(--tg-theme-bg-color)',
    color: 'var(--tg-theme-text-color)'
  },
})

export const modalTheme = defineMultiStyleConfig({
  variants: { 'telegram-theme': telegramTheme },
})

const theme = {
  fonts: {
    body: "'Source Sans 3', sans-serif",
    heading: "'Source Sans 3', sans-serif",
  },
  components: { 
    Button: buttonTheme,
    Modal: modalTheme,
  },

}

export default theme;
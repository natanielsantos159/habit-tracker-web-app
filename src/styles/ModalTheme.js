import { modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const telegramTheme = definePartsStyle({
  dialog: {
    bg: 'var(--tg-theme-bg-color)',
    color: 'var(--tg-theme-text-color)'
  },
})

export const modalTheme = defineMultiStyleConfig({
  variants: { 'telegram-theme': telegramTheme },
});
import { modalTheme } from './ModalTheme.js';
import { buttonTheme } from './ButtonTheme.js';

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
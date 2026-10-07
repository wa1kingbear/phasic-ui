import type { Preview } from '@storybook/react-vite';
import '@phasic-ui/tokens/styles.css';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error',
    },
    controls: {
      expanded: true,
    },
    layout: 'fullscreen',
  },
};

export default preview;

import { Stack, Text, VisuallyHidden } from '@phasic-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Accessibility/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack align="center" className="foundation-demo-panel" gap={3}>
      <button className="foundation-demo-icon-button" type="button">
        <span aria-hidden="true">×</span>
        <VisuallyHidden>Close deployment details</VisuallyHidden>
      </button>
      <Text variant="body-small" tone="secondary">
        The visible glyph is decorative; the hidden label supplies the button's
        accessible name.
      </Text>
    </Stack>
  ),
};

export const Focusable: Story = {
  render: () => (
    <Stack className="foundation-demo-panel" gap={3}>
      <VisuallyHidden
        as="a"
        className="foundation-demo-skip-link"
        focusable
        href="#story-content"
      >
        Skip to story content
      </VisuallyHidden>
      <Text id="story-content" tone="secondary">
        Press Tab to reveal the skip link.
      </Text>
    </Stack>
  ),
};

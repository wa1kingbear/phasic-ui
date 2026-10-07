import { Box, Heading, Text } from '@phasic-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Layout/Box',
  component: Box,
  args: {
    padding: 5,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Box {...args} as="article" className="foundation-demo-card">
      <Text variant="caption" tone="muted" weight="semibold">
        RESOURCE / 04
      </Text>
      <Heading level={2} size="heading-3">
        Production API
      </Heading>
      <Text tone="secondary">
        A semantic container with spacing expressed through the shared token
        scale.
      </Text>
    </Box>
  ),
};

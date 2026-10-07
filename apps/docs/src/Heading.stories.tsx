import { Heading, Stack, Text } from '@phasic-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Typography/Heading',
  component: Heading,
  args: {
    children: 'Every interface has a phase.',
    level: 2,
    size: 'heading-2',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scale: Story = {
  render: () => (
    <Stack className="foundation-demo-type" gap={6}>
      <Stack gap={2}>
        <Text variant="caption" tone="muted">
          DISPLAY / H1
        </Text>
        <Heading level={1} size="display">
          Real product states.
        </Heading>
      </Stack>
      <Stack gap={2}>
        <Text variant="caption" tone="muted">
          HEADING 1 / H2
        </Text>
        <Heading level={2} size="heading-1">
          Resource health
        </Heading>
      </Stack>
      <Stack gap={2}>
        <Text variant="caption" tone="muted">
          HEADING 3 / H3
        </Text>
        <Heading level={3} size="heading-3">
          Retry policy
        </Heading>
      </Stack>
    </Stack>
  ),
};

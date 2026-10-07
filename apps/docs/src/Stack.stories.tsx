import { Box, Heading, Stack, Text } from '@phasic-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Layout/Stack',
  component: Stack,
  args: {
    gap: 4,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Stack {...args} className="foundation-demo-panel">
      <Text variant="caption" tone="muted" weight="semibold">
        DEPLOYMENT WINDOW
      </Text>
      <Heading level={2} size="heading-2">
        Three checks remain.
      </Heading>
      <Text tone="secondary">
        Stack keeps vertical rhythm explicit while preserving the semantics of
        its chosen root element.
      </Text>
      <Box className="foundation-demo-signal" padding={3}>
        <Text variant="body-small" weight="semibold">
          Next check · smoke test
        </Text>
      </Box>
    </Stack>
  ),
};

export const AsList: Story = {
  render: (args) => (
    <Stack {...args} as="ol" className="foundation-demo-list" gap={2}>
      <li>Package contract verified</li>
      <li>Keyboard path verified</li>
      <li>Release notes prepared</li>
    </Stack>
  ),
};

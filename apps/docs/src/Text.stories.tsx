import { Stack, Text } from '@phasic-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Typography/Text',
  component: Text,
  args: {
    children: 'Interface copy should explain state without relying on color.',
    tone: 'primary',
    variant: 'body',
    weight: 'regular',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack className="foundation-demo-type" gap={4}>
      <Text variant="body">Body / Operational context and product copy.</Text>
      <Text variant="body-small" tone="secondary">
        Body small / Supporting detail for a resource state.
      </Text>
      <Text variant="caption" tone="muted" weight="semibold">
        CAPTION / PHASE 02 / PENDING
      </Text>
      <Text variant="code">request-id: ph_2941_healthy</Text>
    </Stack>
  ),
};

export const Truncated: Story = {
  args: {
    children:
      'checkout-service-production-eu-west-1-deployment-with-a-long-resource-name',
    truncate: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '18rem' }}>
        <Story />
      </div>
    ),
  ],
};

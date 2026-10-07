import { Inline, Text } from '@phasic-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Layout/Inline',
  component: Inline,
  args: {
    align: 'center',
    gap: 2,
    wrap: true,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Inline>;

export default meta;

type Story = StoryObj<typeof meta>;

const phases = ['Idle', 'Loading', 'Empty', 'Error', 'Offline', 'Success'];

export const Default: Story = {
  render: (args) => (
    <Inline {...args} className="foundation-demo-rail" aria-label="Demo phases">
      {phases.map((phase, index) => (
        <Text
          as="span"
          className="foundation-demo-phase"
          data-active={index === 1 ? '' : undefined}
          key={phase}
          variant="caption"
          weight="semibold"
        >
          {String(index + 1).padStart(2, '0')} · {phase}
        </Text>
      ))}
    </Inline>
  ),
};

export const NoWrap: Story = {
  args: {
    wrap: false,
  },
  render: (args) => (
    <Inline {...args} className="foundation-demo-nowrap">
      <Text weight="semibold">Run 2941</Text>
      <Text tone="muted">main</Text>
      <Text tone="success">Healthy</Text>
    </Inline>
  ),
};

export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '18rem' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Inline {...args} aria-label="Demo phases">
      {phases.map((phase) => (
        <Text
          as="span"
          className="foundation-demo-phase"
          key={phase}
          variant="caption"
          weight="semibold"
        >
          {phase}
        </Text>
      ))}
    </Inline>
  ),
};

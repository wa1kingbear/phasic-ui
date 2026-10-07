import { Button, Inline, Stack, Text } from '@phasic-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

const meta = {
  title: 'Primitives/Actions/Button',
  component: Button,
  args: {
    children: 'Save changes',
    size: 'md',
    variant: 'primary',
  },
  argTypes: {
    endIcon: { control: false },
    startIcon: { control: false },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack gap={4} className="button-story-group">
      <Text variant="caption" tone="muted" weight="semibold">
        ACTION INTENT / 04
      </Text>
      <Inline gap={3} align="center">
        <Button variant="primary">Create project</Button>
        <Button variant="secondary">View details</Button>
        <Button variant="ghost">Dismiss</Button>
        <Button variant="danger">Delete project</Button>
      </Inline>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Inline>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Inline gap={3}>
      <Button startIcon={<PlusIcon />}>Create project</Button>
      <Button variant="secondary" endIcon={<ArrowIcon />}>
        Review deployment
      </Button>
    </Inline>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Deploy unavailable',
    disabled: true,
  },
};

export const Pressed: Story = {
  args: {
    'aria-pressed': true,
    children: 'Pinned',
    variant: 'secondary',
  },
};

export const Composition: Story = {
  render: () => (
    <section
      className="button-product-card"
      aria-labelledby="project-card-title"
    >
      <div>
        <Text variant="caption" tone="muted" weight="semibold">
          PROJECT / RELEASE-24
        </Text>
        <h2 id="project-card-title">Production rollout</h2>
        <Text tone="secondary">
          Twelve checks passed. The release is ready for approval.
        </Text>
      </div>
      <Inline gap={2} justify="end">
        <Button variant="ghost">Review checks</Button>
        <Button endIcon={<ArrowIcon />}>Approve release</Button>
      </Inline>
    </section>
  ),
};

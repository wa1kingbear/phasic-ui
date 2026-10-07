import { IconButton, Inline, Stack, Text } from '@phasic-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

function MoreIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <circle cx="3" cy="8" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="13" cy="8" r="1.25" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3.5 11.5h9l-1-1.8V6.8a3.5 3.5 0 0 0-7 0v2.9l-1 1.8Z" />
      <path d="M6.5 13a1.7 1.7 0 0 0 3 0" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="m4 4 8 8m0-8-8 8" />
    </svg>
  );
}

const meta = {
  title: 'Primitives/Actions/IconButton',
  component: IconButton,
  args: {
    'aria-label': 'Open actions',
    children: <MoreIcon />,
    size: 'md',
    variant: 'secondary',
  },
  argTypes: {
    children: { control: false },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Inline gap={3}>
      <IconButton aria-label="Open primary actions" variant="primary">
        <MoreIcon />
      </IconButton>
      <IconButton aria-label="Open secondary actions" variant="secondary">
        <MoreIcon />
      </IconButton>
      <IconButton aria-label="Open compact actions" variant="ghost">
        <MoreIcon />
      </IconButton>
      <IconButton aria-label="Delete project" variant="danger">
        <CloseIcon />
      </IconButton>
    </Inline>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Inline gap={3} align="center">
      <IconButton aria-label="Small actions" size="sm">
        <MoreIcon />
      </IconButton>
      <IconButton aria-label="Medium actions" size="md">
        <MoreIcon />
      </IconButton>
      <IconButton aria-label="Large actions" size="lg">
        <MoreIcon />
      </IconButton>
    </Inline>
  ),
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Notifications unavailable',
    children: <BellIcon />,
    disabled: true,
  },
};

export const AccessibleLabels: Story = {
  render: () => (
    <Stack gap={4} className="button-story-group">
      <div>
        <Text variant="caption" tone="muted" weight="semibold">
          ACCESSIBLE TOOLBAR
        </Text>
        <Text tone="secondary" variant="body-small">
          Every icon-only action exposes a required accessible name.
        </Text>
      </div>
      <Inline gap={2} role="toolbar" aria-label="Project controls">
        <IconButton aria-label="View notifications" variant="ghost">
          <BellIcon />
        </IconButton>
        <IconButton aria-label="Open project actions" variant="ghost">
          <MoreIcon />
        </IconButton>
        <IconButton aria-label="Close project" variant="ghost">
          <CloseIcon />
        </IconButton>
      </Inline>
    </Stack>
  ),
};

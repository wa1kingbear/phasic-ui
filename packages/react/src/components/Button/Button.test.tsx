import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16">
      <title>Arrow</title>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

describe('Button', () => {
  it('renders a native button with safe defaults and forwards its ref', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref}>Create project</Button>);

    const button = screen.getByRole('button', { name: 'Create project' });

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(button).toHaveAttribute('data-size', 'md');
    expect(ref.current).toBe(button);
  });

  it('preserves native button attributes and pressed semantics', () => {
    render(
      <Button type="submit" variant="ghost" size="sm" aria-pressed="true">
        Pin release
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Pin release' });

    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-variant', 'ghost');
    expect(button).toHaveAttribute('data-size', 'sm');
  });

  it('activates from the keyboard using native button behavior', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Run checks</Button>);

    await user.tab();
    expect(screen.getByRole('button', { name: 'Run checks' })).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('prevents pointer and keyboard activation when disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={onClick}>
        Delete project
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Delete project' });

    await user.click(button);
    await user.tab();

    expect(button).toBeDisabled();
    expect(button).not.toHaveFocus();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('keeps decorative icon slots out of the accessible name', () => {
    render(
      <Button startIcon={<ArrowIcon />} endIcon={<ArrowIcon />}>
        Deploy
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Deploy' })).toBeInTheDocument();
    expect(screen.getAllByTitle('Arrow')).toHaveLength(2);
    expect(
      screen.getAllByTitle('Arrow')[0]?.closest('[data-slot="start-icon"]'),
    ).toHaveAttribute('aria-hidden', 'true');
  });
});

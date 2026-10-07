import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { IconButton } from './IconButton';

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16">
      <path d="m4 4 8 8m0-8-8 8" />
    </svg>
  );
}

describe('IconButton', () => {
  it('uses its required aria-label as the accessible name', () => {
    render(
      <IconButton aria-label="Close project panel">
        <CloseIcon />
      </IconButton>,
    );

    const button = screen.getByRole('button', {
      name: 'Close project panel',
    });

    expect(button).toHaveAttribute('type', 'button');
    expect(button.querySelector('svg')?.parentElement).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('forwards its ref and native callback semantics', async () => {
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    const user = userEvent.setup();

    render(
      <IconButton
        ref={ref}
        aria-label="Open project actions"
        onClick={onClick}
        variant="secondary"
        size="lg"
      >
        <span>•••</span>
      </IconButton>,
    );

    const button = screen.getByRole('button', {
      name: 'Open project actions',
    });

    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute('data-variant', 'secondary');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('remains inert while disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <IconButton disabled aria-label="Archive project" onClick={onClick}>
        <span>↓</span>
      </IconButton>,
    );

    await user.click(screen.getByRole('button', { name: 'Archive project' }));

    expect(onClick).not.toHaveBeenCalled();
  });
});

import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Box } from './Box';
import { Heading } from './Heading';
import { Inline } from './Inline';
import { Stack } from './Stack';
import { Text } from './Text';
import { VisuallyHidden } from './VisuallyHidden';

describe('layout primitives', () => {
  it('renders Box as a semantic element with token spacing and forwarded props', () => {
    const ref = createRef<HTMLElement>();

    render(
      <Box
        ref={ref}
        as="section"
        aria-label="Project summary"
        className="consumer-box"
        padding={5}
        paddingInline={6}
      />,
    );

    const box = screen.getByRole('region', { name: 'Project summary' });

    expect(box.tagName).toBe('SECTION');
    expect(box).toHaveClass('consumer-box');
    expect(box).toHaveStyle({
      '--ph-box-padding': 'var(--ph-space-5)',
      '--ph-box-padding-inline': 'var(--ph-space-6)',
    });
    expect(ref.current).toBe(box);
  });

  it('configures Stack alignment and spacing without changing list semantics', () => {
    render(
      <Stack as="ul" align="start" gap={2} data-testid="stack">
        <li>Draft</li>
        <li>Published</li>
      </Stack>,
    );

    const stack = screen.getByRole('list');

    expect(stack).toHaveStyle({ '--ph-stack-gap': 'var(--ph-space-2)' });
    expect(stack.className).toContain('align-start');
  });

  it('supports a non-wrapping Inline group', () => {
    render(<Inline wrap={false} gap={1} data-testid="inline" />);

    expect(screen.getByTestId('inline')).toHaveStyle({
      '--ph-inline-gap': 'var(--ph-space-1)',
      '--ph-inline-wrap': 'nowrap',
    });
  });
});

describe('typography primitives', () => {
  it('keeps Text semantics independent from its visual variant', () => {
    render(
      <Text as="span" variant="code" tone="secondary">
        request-id: 2941
      </Text>,
    );

    const text = screen.getByText('request-id: 2941');

    expect(text.tagName).toBe('SPAN');
    expect(text.className).toContain('code');
    expect(text.className).toContain('tone-secondary');
  });

  it('keeps Heading level independent from visual size', () => {
    render(
      <Heading level={3} size="display">
        Deployment health
      </Heading>,
    );

    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'Deployment health',
    });

    expect(heading.className).toContain('display');
  });
});

describe('VisuallyHidden', () => {
  it('provides an accessible name for an icon-only control', () => {
    render(
      <button type="button">
        <span aria-hidden="true">×</span>
        <VisuallyHidden>Close panel</VisuallyHidden>
      </button>,
    );

    expect(
      screen.getByRole('button', { name: 'Close panel' }),
    ).toBeInTheDocument();
  });

  it('supports focus-revealed skip links', () => {
    render(
      <VisuallyHidden as="a" href="#main" focusable>
        Skip to content
      </VisuallyHidden>,
    );

    expect(
      screen.getByRole('link', { name: 'Skip to content' }).className,
    ).toContain('focusable');
  });
});

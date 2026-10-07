import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { usePhasicContext } from '../../internal/PhasicContext';
import { PhasicProvider } from './PhasicProvider';

function ThemeReader() {
  const { theme } = usePhasicContext();

  return <span>{theme}</span>;
}

describe('PhasicProvider', () => {
  it('marks a light theme boundary and forwards root props', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <PhasicProvider
        ref={ref}
        className="consumer-root"
        data-testid="provider"
        style={{ minHeight: 120 }}
      >
        <ThemeReader />
      </PhasicProvider>,
    );

    const provider = screen.getByTestId('provider');

    expect(provider).toHaveAttribute('data-ph-theme', 'light');
    expect(provider).toHaveClass('consumer-root');
    expect(provider).toHaveStyle({ minHeight: '120px' });
    expect(ref.current).toBe(provider);
    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('does not inject runtime styles', () => {
    const stylesBeforeRender = document.head.querySelectorAll('style').length;

    render(
      <PhasicProvider>
        <span>Content</span>
      </PhasicProvider>,
    );

    expect(document.head.querySelectorAll('style')).toHaveLength(
      stylesBeforeRender,
    );
  });

  it('renders deterministically on the server', () => {
    expect(
      renderToString(
        <PhasicProvider id="app-shell">
          <span>Content</span>
        </PhasicProvider>,
      ),
    ).toContain('data-ph-theme="light"');
  });
});

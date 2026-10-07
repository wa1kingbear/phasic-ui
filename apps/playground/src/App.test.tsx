import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('playground shell', () => {
  it('labels the manual testing workspace', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Interaction playground' }),
    ).toBeInTheDocument();
  });
});

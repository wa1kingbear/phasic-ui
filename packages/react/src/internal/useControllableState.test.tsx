import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from './useControllableState';

interface CounterProps {
  onValueChange?: (value: number) => void;
  value?: number;
}

function Counter({ onValueChange, value }: CounterProps) {
  const [count, setCount] = useControllableState({
    defaultValue: 2,
    onValueChange,
    value,
  });

  return (
    <button type="button" onClick={() => setCount((current) => current + 1)}>
      {count}
    </button>
  );
}

describe('useControllableState', () => {
  it('owns and reports an uncontrolled value', () => {
    const onValueChange = vi.fn();

    render(<Counter onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('3');
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it('reports changes without mutating a controlled value', () => {
    const onValueChange = vi.fn();

    render(<Counter value={7} onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('7');
    expect(onValueChange).toHaveBeenCalledWith(8);
  });

  it('supports a controlled owner updating the value', () => {
    function ControlledCounter() {
      const [value, setValue] = useState(4);

      return <Counter value={value} onValueChange={setValue} />;
    }

    render(<ControlledCounter />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('5');
  });
});

import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface UseControllableStateOptions<Value> {
  defaultValue: Value;
  onValueChange?: ((value: Value) => void) | undefined;
  value?: Value | undefined;
}

export function useControllableState<Value>({
  defaultValue,
  onValueChange,
  value,
}: UseControllableStateOptions<Value>): readonly [
  Value,
  Dispatch<SetStateAction<Value>>,
] {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue = useCallback<Dispatch<SetStateAction<Value>>>(
    (nextValue) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (value: Value) => Value)(currentValue)
          : nextValue;

      if (Object.is(currentValue, resolvedValue)) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(resolvedValue);
      }

      onValueChange?.(resolvedValue);
    },
    [currentValue, isControlled, onValueChange],
  );

  return [currentValue, setValue] as const;
}

import type { Ref, RefCallback } from 'react';

type PresentRef<Value> = Exclude<Ref<Value>, null>;

function assignRef<Value>(ref: PresentRef<Value>, value: Value | null) {
  if (typeof ref === 'function') {
    const cleanup = ref(value);

    return typeof cleanup === 'function' ? cleanup : () => ref(null);
  }

  ref.current = value;

  return () => {
    ref.current = null;
  };
}

export function composeRefs<Value>(
  ...refs: Array<Ref<Value> | null | undefined>
): RefCallback<Value> {
  return (value) => {
    const cleanups = refs
      .filter((ref): ref is PresentRef<Value> => ref != null)
      .map((ref) => assignRef(ref, value));

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  };
}

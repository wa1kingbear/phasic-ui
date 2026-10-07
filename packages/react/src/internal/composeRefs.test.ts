import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { composeRefs } from './composeRefs';

describe('composeRefs', () => {
  it('updates object and callback refs and cleans them up', () => {
    const objectRef = createRef<HTMLButtonElement>();
    const callbackCleanup = vi.fn();
    const callbackRef = vi.fn(() => callbackCleanup);
    const composedRef = composeRefs(objectRef, callbackRef, null);
    const button = document.createElement('button');

    const cleanup = composedRef(button);

    expect(objectRef.current).toBe(button);
    expect(callbackRef).toHaveBeenCalledWith(button);

    cleanup?.();

    expect(objectRef.current).toBeNull();
    expect(callbackCleanup).toHaveBeenCalledOnce();
  });
});

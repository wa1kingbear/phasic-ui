import { createContext, useContext } from 'react';
import type { PhasicTheme } from '../components/PhasicProvider/PhasicProvider';

interface PhasicContextValue {
  theme: PhasicTheme;
}

const defaultContextValue: PhasicContextValue = {
  theme: 'light',
};

export const PhasicContext =
  createContext<PhasicContextValue>(defaultContextValue);

export function usePhasicContext() {
  return useContext(PhasicContext);
}

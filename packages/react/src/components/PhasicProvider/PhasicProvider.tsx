import { forwardRef, useMemo, type ComponentPropsWithoutRef } from 'react';
import { PhasicContext } from '../../internal/PhasicContext';

/** Themes currently supported by the Phasic React provider. */
export type PhasicTheme = 'light';

/** Props for the root Phasic theme and context boundary. */
export interface PhasicProviderProps extends ComponentPropsWithoutRef<'div'> {
  /** Theme applied to this provider subtree. */
  theme?: PhasicTheme;
}

/**
 * Establishes the Phasic context and theme marker for a React subtree.
 *
 * Import `@phasic-ui/tokens/styles.css` once in the application to provide the
 * corresponding CSS variables. The provider never injects styles at runtime.
 */
export const PhasicProvider = forwardRef<HTMLDivElement, PhasicProviderProps>(
  function PhasicProvider(
    { children, theme = 'light', ...rootProps },
    forwardedRef,
  ) {
    const contextValue = useMemo(() => ({ theme }), [theme]);

    return (
      <PhasicContext.Provider value={contextValue}>
        <div {...rootProps} ref={forwardedRef} data-ph-theme={theme}>
          {children}
        </div>
      </PhasicContext.Provider>
    );
  },
);

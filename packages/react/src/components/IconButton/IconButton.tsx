import { forwardRef, type ReactNode } from 'react';
import { Button, type ButtonProps } from '../Button';
import styles from './IconButton.module.css';

/** Props for the compact IconButton action primitive. */
export interface IconButtonProps extends Omit<
  ButtonProps,
  'aria-label' | 'children' | 'endIcon' | 'startIcon'
> {
  /** Required accessible name for the icon-only action. */
  'aria-label': string;
  /** Decorative icon hidden from the accessibility tree. */
  children: ReactNode;
}

/** A square Button that requires an accessible name for its icon-only action. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { 'aria-label': accessibleLabel, children, className, ...buttonProps },
    forwardedRef,
  ) {
    return (
      <Button
        {...buttonProps}
        ref={forwardedRef}
        aria-label={accessibleLabel}
        className={`${styles.root}${className ? ` ${className}` : ''}`}
        startIcon={children}
      />
    );
  },
);

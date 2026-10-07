import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { mergeClassNames } from '../../internal/mergeClassNames';
import styles from './Button.module.css';

/** Visual intent options for Button. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/** Tokenized size options for Button and IconButton. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Props for the native Button action primitive. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Decorative content rendered before the visible label. */
  startIcon?: ReactNode;
  /** Decorative content rendered after the visible label. */
  endIcon?: ReactNode;
  /** Controls the button height, spacing and type scale. */
  size?: ButtonSize;
  /** Communicates the action's visual intent. */
  variant?: ButtonVariant;
}

/**
 * A native button with Phasic sizing, intent variants and decorative icon
 * slots. Async action state belongs in AsyncButton rather than this primitive.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      endIcon,
      size = 'md',
      startIcon,
      type = 'button',
      variant = 'primary',
      ...buttonProps
    },
    forwardedRef,
  ) {
    return (
      <button
        {...buttonProps}
        ref={forwardedRef}
        type={type}
        data-size={size}
        data-variant={variant}
        className={mergeClassNames(
          styles.root,
          styles[size],
          styles[variant],
          className,
        )}
      >
        {startIcon === undefined ? null : (
          <span
            aria-hidden="true"
            className={styles.icon}
            data-slot="start-icon"
          >
            {startIcon}
          </span>
        )}
        {children === undefined ? null : (
          <span className={styles.label}>{children}</span>
        )}
        {endIcon === undefined ? null : (
          <span aria-hidden="true" className={styles.icon} data-slot="end-icon">
            {endIcon}
          </span>
        )}
      </button>
    );
  },
);

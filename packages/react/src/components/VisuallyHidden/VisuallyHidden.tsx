import { forwardRef, type ElementType } from 'react';
import { mergeClassNames } from '../../internal/mergeClassNames';
import type {
  PolymorphicComponent,
  PolymorphicProps,
  PolymorphicRef,
} from '../../internal/polymorphic';
import styles from './VisuallyHidden.module.css';

interface VisuallyHiddenOwnProps {
  /** Reveals hidden content when it or a descendant receives focus. */
  focusable?: boolean;
}

/** Props for the polymorphic VisuallyHidden accessibility primitive. */
export type VisuallyHiddenProps<Component extends ElementType = 'span'> =
  PolymorphicProps<Component, VisuallyHiddenOwnProps>;

function VisuallyHiddenImplementation<Component extends ElementType = 'span'>(
  {
    as,
    className,
    focusable = false,
    ...rootProps
  }: VisuallyHiddenProps<Component>,
  forwardedRef: PolymorphicRef<Component>,
) {
  const Component = as ?? 'span';

  return (
    <Component
      {...rootProps}
      ref={forwardedRef}
      className={mergeClassNames(
        styles.root,
        focusable && styles.focusable,
        className,
      )}
    />
  );
}

/** Visually hides content while keeping it available to assistive technology. */
export const VisuallyHidden = forwardRef(
  VisuallyHiddenImplementation as never,
) as unknown as PolymorphicComponent<'span', VisuallyHiddenOwnProps>;

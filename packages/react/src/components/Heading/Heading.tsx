import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { mergeClassNames } from '../../internal/mergeClassNames';
import styles from './Heading.module.css';

/** Semantic heading levels available to Heading. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Visual heading scales, independent from document outline level. */
export type HeadingSize = 'display' | 'heading-1' | 'heading-2' | 'heading-3';

/** Props for the semantic Heading primitive. */
export interface HeadingProps extends ComponentPropsWithoutRef<'h2'> {
  /** Semantic level used in the document outline. */
  level?: HeadingLevel;
  /** Visual size, which may differ from the semantic level. */
  size?: HeadingSize;
}

/** A semantic heading with an independently selectable visual scale. */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    { className, level = 2, size = 'heading-2', ...rootProps },
    forwardedRef,
  ) {
    const Component = `h${level}` as const;

    return (
      <Component
        {...rootProps}
        ref={forwardedRef}
        className={mergeClassNames(styles.root, styles[size], className)}
      />
    );
  },
);

import { forwardRef, type ElementType } from 'react';
import { mergeClassNames } from '../../internal/mergeClassNames';
import type {
  PolymorphicComponent,
  PolymorphicProps,
  PolymorphicRef,
} from '../../internal/polymorphic';
import styles from './Text.module.css';

/** Visual scale options for Text. */
export type TextVariant = 'body' | 'body-small' | 'caption' | 'code';

/** Semantic color roles for Text. */
export type TextTone =
  'primary' | 'secondary' | 'muted' | 'inverse' | 'danger' | 'success';

/** Font-weight options backed by Phasic typography tokens. */
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

interface TextOwnProps {
  /** Crops overflowing content to one line with an ellipsis. */
  truncate?: boolean;
  /** Semantic text color. */
  tone?: TextTone;
  /** Typography scale. */
  variant?: TextVariant;
  /** Tokenized font weight. */
  weight?: TextWeight;
}

/** Props for the polymorphic Text primitive. */
export type TextProps<Component extends ElementType = 'p'> = PolymorphicProps<
  Component,
  TextOwnProps
>;

function TextImplementation<Component extends ElementType = 'p'>(
  {
    as,
    className,
    tone = 'primary',
    truncate = false,
    variant = 'body',
    weight = 'regular',
    ...rootProps
  }: TextProps<Component>,
  forwardedRef: PolymorphicRef<Component>,
) {
  const Component = as ?? 'p';

  return (
    <Component
      {...rootProps}
      ref={forwardedRef}
      className={mergeClassNames(
        styles.root,
        styles[variant],
        styles[`tone-${tone}`],
        styles[`weight-${weight}`],
        truncate && styles.truncate,
        className,
      )}
    />
  );
}

/** Token-driven body, supporting and metadata typography. */
export const Text = forwardRef(
  TextImplementation as never,
) as unknown as PolymorphicComponent<'p', TextOwnProps>;

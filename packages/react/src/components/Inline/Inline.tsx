import { forwardRef, type ElementType } from 'react';
import { mergeClassNames } from '../../internal/mergeClassNames';
import type {
  PolymorphicComponent,
  PolymorphicProps,
  PolymorphicRef,
} from '../../internal/polymorphic';
import { spaceValue, withStyleVariables } from '../../internal/styleVariables';
import type {
  LayoutAlignment,
  LayoutJustification,
  SpacingScale,
} from '../../types/foundation';
import styles from './Inline.module.css';

interface InlineOwnProps {
  /** Cross-axis alignment. */
  align?: LayoutAlignment;
  /** Space between direct children. */
  gap?: SpacingScale;
  /** Main-axis distribution. */
  justify?: LayoutJustification;
  /** Whether children may wrap onto additional rows. */
  wrap?: boolean;
}

/** Props for the polymorphic horizontal Inline layout primitive. */
export type InlineProps<Component extends ElementType = 'div'> =
  PolymorphicProps<Component, InlineOwnProps>;

function InlineImplementation<Component extends ElementType = 'div'>(
  {
    align = 'center',
    as,
    className,
    gap = 3,
    justify = 'start',
    style,
    wrap = true,
    ...rootProps
  }: InlineProps<Component>,
  forwardedRef: PolymorphicRef<Component>,
) {
  const Component = as ?? 'div';

  return (
    <Component
      {...rootProps}
      ref={forwardedRef}
      className={mergeClassNames(
        styles.root,
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        className,
      )}
      style={withStyleVariables(style, {
        '--ph-inline-gap': spaceValue(gap),
        '--ph-inline-wrap': wrap ? 'wrap' : 'nowrap',
      })}
    />
  );
}

/** A horizontal flex layout with token-based spacing and optional wrapping. */
export const Inline = forwardRef(
  InlineImplementation as never,
) as unknown as PolymorphicComponent<'div', InlineOwnProps>;

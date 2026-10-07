import { forwardRef, type ElementType } from 'react';
import { mergeClassNames } from '../../internal/mergeClassNames';
import type {
  PolymorphicComponent,
  PolymorphicProps,
  PolymorphicRef,
} from '../../internal/polymorphic';
import { spaceValue, withStyleVariables } from '../../internal/styleVariables';
import type { SpacingScale } from '../../types/foundation';
import styles from './Box.module.css';

interface BoxOwnProps {
  /** Margin on every side, expressed with the Phasic spacing scale. */
  margin?: SpacingScale;
  /** Block-axis margin, overriding `margin` when provided. */
  marginBlock?: SpacingScale;
  /** Inline-axis margin, overriding `margin` when provided. */
  marginInline?: SpacingScale;
  /** Padding on every side, expressed with the Phasic spacing scale. */
  padding?: SpacingScale;
  /** Block-axis padding, overriding `padding` when provided. */
  paddingBlock?: SpacingScale;
  /** Inline-axis padding, overriding `padding` when provided. */
  paddingInline?: SpacingScale;
}

/** Props for the polymorphic Box layout primitive. */
export type BoxProps<Component extends ElementType = 'div'> = PolymorphicProps<
  Component,
  BoxOwnProps
>;

function BoxImplementation<Component extends ElementType = 'div'>(
  {
    as,
    className,
    margin,
    marginBlock,
    marginInline,
    padding,
    paddingBlock,
    paddingInline,
    style,
    ...rootProps
  }: BoxProps<Component>,
  forwardedRef: PolymorphicRef<Component>,
) {
  const Component = as ?? 'div';

  return (
    <Component
      {...rootProps}
      ref={forwardedRef}
      className={mergeClassNames(styles.root, className)}
      style={withStyleVariables(style, {
        '--ph-box-margin':
          margin === undefined ? undefined : spaceValue(margin),
        '--ph-box-margin-block':
          marginBlock === undefined ? undefined : spaceValue(marginBlock),
        '--ph-box-margin-inline':
          marginInline === undefined ? undefined : spaceValue(marginInline),
        '--ph-box-padding':
          padding === undefined ? undefined : spaceValue(padding),
        '--ph-box-padding-block':
          paddingBlock === undefined ? undefined : spaceValue(paddingBlock),
        '--ph-box-padding-inline':
          paddingInline === undefined ? undefined : spaceValue(paddingInline),
      })}
    />
  );
}

/**
 * A minimal polymorphic container with token-based margin and padding props.
 */
export const Box = forwardRef(
  BoxImplementation as never,
) as unknown as PolymorphicComponent<'div', BoxOwnProps>;

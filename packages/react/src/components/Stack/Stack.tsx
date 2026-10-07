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
import styles from './Stack.module.css';

interface StackOwnProps {
  /** Cross-axis alignment. */
  align?: LayoutAlignment;
  /** Space between direct children. */
  gap?: SpacingScale;
  /** Main-axis distribution. */
  justify?: LayoutJustification;
}

/** Props for the polymorphic vertical Stack layout primitive. */
export type StackProps<Component extends ElementType = 'div'> =
  PolymorphicProps<Component, StackOwnProps>;

function StackImplementation<Component extends ElementType = 'div'>(
  {
    align = 'stretch',
    as,
    className,
    gap = 4,
    justify = 'start',
    style,
    ...rootProps
  }: StackProps<Component>,
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
        '--ph-stack-gap': spaceValue(gap),
      })}
    />
  );
}

/** A vertical flex layout with token-based spacing. */
export const Stack = forwardRef(
  StackImplementation as never,
) as unknown as PolymorphicComponent<'div', StackOwnProps>;

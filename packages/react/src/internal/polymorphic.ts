import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  ReactElement,
} from 'react';

export type PolymorphicRef<Component extends ElementType> =
  ComponentPropsWithRef<Component>['ref'];

export type PolymorphicProps<
  Component extends ElementType,
  OwnProps,
> = OwnProps &
  Omit<ComponentPropsWithoutRef<Component>, keyof OwnProps | 'as'> & {
    as?: Component;
  };

export type PolymorphicComponent<
  DefaultComponent extends ElementType,
  OwnProps,
> = <Component extends ElementType = DefaultComponent>(
  props: PolymorphicProps<Component, OwnProps> & {
    ref?: PolymorphicRef<Component>;
  },
) => ReactElement | null;

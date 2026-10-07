import { PhasicProvider } from '@phasic-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';

const meta = {
  title: 'Foundations/Provider',
  component: PhasicProvider,
  args: {
    theme: 'light',
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PhasicProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <PhasicProvider {...args} className="provider-story">
      <article className="provider-story-card">
        <span className="provider-story-signal" aria-hidden="true" />
        <p className="eyebrow">Theme boundary / light</p>
        <h1>Tokens inherit through the product tree.</h1>
        <p>
          The provider supplies context and a semantic theme marker without
          injecting runtime styles.
        </p>
      </article>
    </PhasicProvider>
  ),
};

export const SubtreeOverride: Story = {
  render: (args) => (
    <PhasicProvider
      {...args}
      className="provider-story"
      style={
        {
          '--ph-color-accent': 'var(--ph-color-info)',
        } as CSSProperties
      }
    >
      <article className="provider-story-card">
        <span className="provider-story-signal" aria-hidden="true" />
        <p className="eyebrow">Scoped override / info signal</p>
        <h1>One subtree, one deliberate adjustment.</h1>
        <p>
          Semantic variables can be overridden locally without changing
          component source or creating a style runtime.
        </p>
      </article>
    </PhasicProvider>
  ),
};

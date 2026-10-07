import { tokens } from '@phasic-ui/tokens';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';

const colors = [
  { label: 'Canvas', value: tokens.color.bgCanvas },
  { label: 'Surface', value: tokens.color.bgSurface },
  { label: 'Graphite', value: tokens.color.textPrimary },
  { label: 'Accent', value: tokens.color.accent },
  { label: 'Pending', value: tokens.color.phasePending },
  { label: 'Danger', value: tokens.color.phaseError },
] as const;

const spacing = [
  tokens.space[1],
  tokens.space[2],
  tokens.space[3],
  tokens.space[4],
  tokens.space[5],
  tokens.space[6],
  tokens.space[7],
];

function TokenFoundation() {
  return (
    <main className="token-foundation" data-ph-theme="light">
      <header className="token-foundation-header">
        <div>
          <p className="eyebrow">Foundation / 01</p>
          <h1>One language for every phase.</h1>
        </div>
        <p>
          Semantic values keep components expressive while themes remain free to
          change underneath them.
        </p>
      </header>

      <section className="token-section" aria-labelledby="color-heading">
        <div className="token-section-label">
          <span>01</span>
          <h2 id="color-heading">Color signals</h2>
        </div>
        <div className="token-color-grid">
          {colors.map((color) => (
            <article
              className="token-color"
              key={color.label}
              style={{ '--token-swatch': color.value } as CSSProperties}
            >
              <span aria-hidden="true" />
              <strong>{color.label}</strong>
              <code>{color.value}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="token-section" aria-labelledby="type-heading">
        <div className="token-section-label">
          <span>02</span>
          <h2 id="type-heading">Type rhythm</h2>
        </div>
        <div className="token-type-stack">
          <p className="token-type-display">Display / 56</p>
          <p className="token-type-heading">Heading / 32</p>
          <p className="token-type-body">
            Body / 16 — Product states stay clear under pressure.
          </p>
          <p className="token-type-caption">Caption / 12 · SYSTEM READY</p>
        </div>
      </section>

      <section className="token-section" aria-labelledby="space-heading">
        <div className="token-section-label">
          <span>03</span>
          <h2 id="space-heading">Spacing cadence</h2>
        </div>
        <div className="token-space-list">
          {spacing.map((space, index) => (
            <div className="token-space" key={space}>
              <code>{index + 1}</code>
              <span style={{ '--token-space': space } as CSSProperties} />
              <small>{space}</small>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: 'Foundations/Tokens',
  component: TokenFoundation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TokenFoundation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LightTheme: Story = {};

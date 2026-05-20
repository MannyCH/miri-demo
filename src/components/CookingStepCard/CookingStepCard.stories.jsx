import React from 'react';
import { CookingStepCard } from './CookingStepCard';

export default {
  title: 'Components/CookingStepCard',
  component: CookingStepCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Action card shown during cooking mode. Each card is a self-contained step combining an action verb, the ingredients involved, and an optional duration.

## Layouts

- **\`simple\`** (default) — each item renders as \`qty name\` (bold) with an optional \`note\` line below. Use for prep/wash/serve steps where a short annotation follows the ingredient.
- **\`grid\`** — items render as a two-column table: fixed-width \`qty\` column on the left, \`name\` filling the rest. Use for "add ingredients" steps listing multiple quantities without notes.

## Data shape

Each item: \`{ qty?: string, name: string, note?: string }\`

Duration (optional): \`{ num: string, unit: string }\`

## Token mapping

| Element | Token |
|---------|-------|
| Card background | \`--color-fill-brand-weak\` |
| Card radius | \`--corner-radius-card\` |
| Card padding | \`--spacing-inset-md\` |
| Verb / icon text | \`--color-text-strong\` · \`text-h3-bold\` |
| Ingredient text | \`--color-text-weak\` · \`text-body-small-bold\` |
| Note text | \`--color-text-weak\` · \`text-body-small-regular\` |
| Duration text | \`--color-text-weak\` · \`text-tiny-bold\` |
| Grid row gap | \`--spacing-gap-sm\` |
| Simple item gap | \`--spacing-24\` |`,
      },
    },
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['simple', 'grid'],
      description: '`simple` — name + optional note stacked. `grid` — qty | name two-column rows.',
    },
    icon: { control: 'text' },
    verb: { control: 'text' },
    items: { control: 'object' },
    duration: { control: 'object' },
  },
};

export const Wash = {
  args: {
    icon: '💧',
    verb: 'Wash',
    layout: 'simple',
    items: [
      { qty: '75g', name: 'yellow lentils', note: 'rinse under cold water until clear' },
    ],
    duration: null,
  },
  parameters: {
    docs: {
      description: { story: 'Single ingredient with a prep note. Active (100% opacity) state.' },
    },
  },
};

export const Prep = {
  args: {
    icon: '🔪',
    verb: 'Prep',
    layout: 'simple',
    items: [
      { qty: '50g', name: 'potato', note: 'cut into quarters' },
      { qty: '½', name: 'onion', note: 'cut into quarters' },
    ],
    duration: null,
  },
  parameters: {
    docs: {
      description: { story: 'Multiple ingredients in simple layout, each with a note.' },
    },
  },
};

export const AddIngredients = {
  args: {
    icon: '🥣',
    verb: 'Add into pan',
    layout: 'grid',
    items: [
      { qty: '1L', name: 'water' },
      { qty: '75g', name: 'yellow lentils' },
      { qty: '½', name: 'onion' },
      { qty: '1 tsp', name: 'salt' },
    ],
    duration: null,
  },
  parameters: {
    docs: {
      description: { story: 'Grid layout with qty | name columns. Used for "add ingredients" steps.' },
    },
  },
};

export const WithDuration = {
  args: {
    icon: '🔥',
    verb: 'Boil',
    layout: 'simple',
    items: [
      { name: 'bring to the boil' },
    ],
    duration: { num: '10', unit: 'min' },
  },
  parameters: {
    docs: {
      description: { story: 'Step with a timed duration shown below the items.' },
    },
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-gap-lg)', maxWidth: '390px' }}>
      <CookingStepCard
        icon="💧" verb="Wash" layout="simple"
        items={[{ qty: '75g', name: 'yellow lentils', note: 'rinse under cold water until clear' }]}
      />
      <CookingStepCard
        icon="🔪" verb="Prep" layout="simple"
        items={[
          { qty: '50g', name: 'potato', note: 'cut into quarters' },
          { qty: '½', name: 'onion', note: 'cut into quarters' },
        ]}
      />
      <CookingStepCard
        icon="🥣" verb="Add into pan" layout="grid"
        items={[
          { qty: '1L', name: 'water' },
          { qty: '75g', name: 'yellow lentils' },
          { qty: '½', name: 'onion' },
          { qty: '1 tsp', name: 'salt' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'All card variants side by side.' },
    },
  },
};

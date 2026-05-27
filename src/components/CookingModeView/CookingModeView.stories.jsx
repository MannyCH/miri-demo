import React, { useState } from 'react';
import { CookingModeView } from './CookingModeView';

const LENTIL_SOUP_STEPS = [
  {
    icon: '💧',
    verb: 'Wash',
    layout: 'simple',
    items: [{ qty: '75g', name: 'yellow lentils', note: 'rinse under cold water until clear' }],
    duration: null,
  },
  {
    icon: '🔪',
    verb: 'Prep',
    layout: 'simple',
    items: [
      { qty: '50g', name: 'potato', note: 'cut into quarters' },
      { qty: '½', name: 'onion', note: 'cut into quarters' },
    ],
    duration: null,
  },
  {
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
  {
    icon: '🔥',
    verb: 'Boil',
    layout: 'simple',
    items: [{ name: 'bring to the boil' }],
    duration: { num: '10', unit: 'min' },
  },
  {
    icon: '🌡️',
    verb: 'Simmer',
    layout: 'simple',
    items: [
      { name: 'reduce heat' },
      { name: 'skim surface', note: 'slotted spoon' },
    ],
    duration: { num: '25', unit: 'min' },
  },
  {
    icon: '💪',
    verb: 'Mash',
    layout: 'simple',
    items: [
      { name: 'remove from heat' },
      { name: 'mash everything in the pan' },
    ],
    duration: null,
  },
  {
    icon: '🥣',
    verb: 'Add & whisk',
    layout: 'grid',
    items: [
      { qty: '1L', name: 'boiling water' },
      { qty: '¼ tsp', name: 'ground cumin' },
      { qty: '¼ tsp', name: 'turmeric' },
      { qty: '⅛ tsp', name: 'white pepper' },
    ],
    duration: { num: '1', unit: 'min — whisk constantly' },
  },
  {
    icon: '🔥',
    verb: 'Cook',
    layout: 'simple',
    items: [{ name: 'return to heat' }],
    duration: { num: '5', unit: 'min' },
  },
  {
    icon: '🍋',
    verb: 'Serve',
    layout: 'simple',
    items: [{ qty: '½', name: 'lemon', note: 'squeeze over each bowl' }],
    duration: null,
  },
];

export default {
  title: 'Components/CookingModeView',
  component: CookingModeView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Full-screen cooking mode view. Renders a stacked list of \`CookingStepCard\` components with progressive opacity — the active step at 100%, the next at 60%, the following at 30%.

## Usage

Pass the complete \`steps\` array and control \`currentStep\` externally. The component handles stacking and opacity automatically.

Each step shape: \`{ icon, verb, items, duration, layout? }\`

## Token mapping

| Element | Token |
|---------|-------|
| Background | \`--color-background-base\` |
| Title | \`--color-text-strong\` · \`text-h1-bold\` |
| Step label | \`--color-text-brand\` · \`text-tiny-bold\` |
| Step label padding | \`--spacing-inset-md\` |
| Layout padding | \`--spacing-inset-md\` |
| Nav top spacing | \`--spacing-stack-md\` |`,
      },
    },
  },
};

export const Step1 = {
  args: {
    recipeTitle: 'Yellow lentil soup',
    steps: LENTIL_SOUP_STEPS,
    currentStep: 0,
  },
  parameters: {
    docs: {
      description: { story: 'First step — Back button is disabled. Shows active card + two faded peek cards.' },
    },
  },
};

export const Step2 = {
  args: {
    recipeTitle: 'Yellow lentil soup',
    steps: LENTIL_SOUP_STEPS,
    currentStep: 1,
  },
  parameters: {
    docs: {
      description: { story: 'Mid step — both Back and Next are active.' },
    },
  },
};

export const LastStep = {
  args: {
    recipeTitle: 'Yellow lentil soup',
    steps: LENTIL_SOUP_STEPS,
    currentStep: 8,
  },
  parameters: {
    docs: {
      description: { story: 'Last step — Next button label changes to "Finish".' },
    },
  },
};

export const Interactive = {
  render: () => {
    const [step, setStep] = useState(0);

    const handleNext = () => setStep(s => Math.min(s + 1, LENTIL_SOUP_STEPS.length - 1));
    const handleBack = () => setStep(s => Math.max(s - 1, 0));
    const handleQuit = () => setStep(0);

    return (
      <div style={{ maxWidth: '390px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CookingModeView
          recipeTitle="Yellow lentil soup"
          steps={LENTIL_SOUP_STEPS}
          currentStep={step}
          onNext={handleNext}
          onBack={handleBack}
          onQuit={handleQuit}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Fully interactive — use Back/Next to walk through all 9 steps. Quit resets to step 1.' },
    },
  },
};

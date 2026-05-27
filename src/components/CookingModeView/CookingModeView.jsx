import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Button } from '../Button';
import { CookingStepCard } from '../CookingStepCard';
import { NavigationBarConnected } from '../NavigationBar/NavigationBarConnected';
import './CookingModeView.css';

const OPACITIES = [1, 0.6, 0.3];
const TRANSITION = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

export const CookingModeView = ({
  recipeTitle,
  steps = [],
  currentStep = 0,
  onNext,
  onBack,
  onQuit,
}) => {
  const prevStep = useRef(currentStep);
  const direction = currentStep >= prevStep.current ? 1 : -1;
  prevStep.current = currentStep;

  const visibleSteps = steps.slice(currentStep, currentStep + OPACITIES.length);
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="cooking-mode-view">
      <h1 className="cooking-mode-view__title text-h1-bold">{recipeTitle}</h1>

      <div className="cooking-mode-view__stack">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={currentStep}
            className="cooking-mode-view__step-stack"
            custom={direction}
            initial={{ y: direction * 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction * -48, opacity: 0 }}
            transition={TRANSITION}
          >
            {visibleSteps.map((step, i) => (
              <div
                key={i}
                className="cooking-mode-view__step-group"
                style={{ opacity: OPACITIES[i] }}
                aria-hidden={i > 0 ? true : undefined}
              >
                <p className="cooking-mode-view__step-label text-tiny-bold">
                  Step {currentStep + i + 1} of {steps.length}
                </p>
                <CookingStepCard
                  icon={step.icon}
                  verb={step.verb}
                  items={step.items}
                  duration={step.duration}
                  layout={step.layout ?? 'simple'}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="cooking-mode-view__nav">
        <div className="cooking-mode-view__nav-group">
          <Button
            variant="secondary"
            icon={<ArrowLeft size={16} />}
            showIcon
            disabled={isFirstStep}
            onClick={onBack}
            aria-label="Previous step"
          >
            Back
          </Button>
          <Button
            variant="secondary"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            showIcon
            onClick={onNext}
            aria-label={isLastStep ? 'Finish cooking' : 'Next step'}
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </div>
        <Button
          variant="tertiary-delete"
          showIcon={false}
          onClick={onQuit}
        >
          Quit cooking
        </Button>
      </div>

      <NavigationBarConnected activeItem="recipes" />
    </div>
  );
};

CookingModeView.displayName = 'CookingModeView';

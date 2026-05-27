import React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import './Button.css';

/**
 * Button component based on Miri design system
 * Built with Base UI for accessibility and composability
 */
export const Button = ({
  variant = 'primary',
  icon,
  showIcon = true,
  iconOnly = false,
  iconPosition = 'left',
  fullWidth = false,
  children,
  ...props
}) => {
  const variantClass = `button-${variant.toLowerCase().replace(' - ', '-')}`;
  const classes = ['button', variantClass, iconOnly && 'button--icon-only', fullWidth && 'button--full-width'].filter(Boolean).join(' ');

  const iconEl = (showIcon || iconOnly) && icon && (
    <span className="button-icon" aria-hidden="true">
      {icon}
    </span>
  );

  return (
    <BaseButton
      className={classes}
      {...props}
    >
      {iconPosition === 'left' && iconEl}
      {!iconOnly && <span className="button-text text-body-small-bold">{children}</span>}
      {iconPosition === 'right' && iconEl}
    </BaseButton>
  );
};

Button.displayName = 'Button';

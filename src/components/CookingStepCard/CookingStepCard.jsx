import React from 'react';
import './CookingStepCard.css';

export const CookingStepCard = ({
  icon,
  verb,
  items = [],
  duration = null,
  layout = 'simple',
}) => {
  return (
    <div className="cooking-step-card">
      <div className="cooking-step-card__header">
        <span className="cooking-step-card__icon text-h3-bold" aria-hidden="true">{icon}</span>
        <span className="cooking-step-card__verb text-h3-bold">{verb}</span>
      </div>

      {layout === 'grid' ? (
        <div className="cooking-step-card__items cooking-step-card__items--grid">
          {items.map((item, i) => (
            <div key={i} className="cooking-step-card__item-row">
              <span className="cooking-step-card__item-qty text-body-small-bold">{item.qty || '—'}</span>
              <span className="cooking-step-card__item-name text-body-small-bold">{item.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="cooking-step-card__items cooking-step-card__items--simple">
          {items.map((item, i) => (
            <div key={i} className="cooking-step-card__item">
              <span className="cooking-step-card__item-text text-body-small-bold">
                {[item.qty, item.name].filter(Boolean).join(' ')}
              </span>
              {item.note && (
                <span className="cooking-step-card__item-note text-body-small-regular">{item.note}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {duration && (
        <p className="cooking-step-card__duration text-tiny-bold">
          {duration.num} {duration.unit}
        </p>
      )}
    </div>
  );
};

CookingStepCard.displayName = 'CookingStepCard';

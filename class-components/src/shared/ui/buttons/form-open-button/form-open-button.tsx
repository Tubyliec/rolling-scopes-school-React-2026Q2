import type { JSX } from 'react';

import type { FormOpenButtonProps } from '@shared/ui/buttons/form-open-button/model/types/form-open-button.type.ts';

import './form-open-button.scss';

export function FormOpenButton({
  label,
  modalType,
  variant = 'default',
  onClick,
}: FormOpenButtonProps): JSX.Element {
  const className = `forms-page__open-btn${
    variant === 'rhf' ? ' forms-page__open-btn--rhf' : ''
  }`;

  const handleClick = (): void => {
    onClick(modalType);
  };

  return (
    <button className={className} type="button" onClick={handleClick}>
      {label}
    </button>
  );
}

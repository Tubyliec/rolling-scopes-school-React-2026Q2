import type { JSX } from 'react';

import type { FieldErrorProps } from '@features/forms/model/types/field-error-props.type.ts';

import './field-error.scss';

function FieldError({ message, id }: FieldErrorProps): JSX.Element | null {
  if (!message) return null;

  return (
    <span className="field-error" id={id} role="alert">
      {message}
    </span>
  );
}

export default FieldError;

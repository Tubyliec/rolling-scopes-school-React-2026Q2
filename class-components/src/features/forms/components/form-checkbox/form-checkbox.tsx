import { forwardRef, type JSX } from 'react';

import FieldError from '@features/forms/components/field-error/field-error.tsx';

import type { FormCheckboxProps } from '@features/forms/model/interfaces/form-checkbox-props.interface.ts';

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ id, label, error, ...rest }, ref): JSX.Element => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="form__field">
        <label className="form-checkbox" htmlFor={id}>
          <input
            id={id}
            ref={ref}
            type="checkbox"
            className="form-checkbox__input"
            {...rest}
          />
          <span className="form-checkbox__label">{label}</span>
        </label>
        <FieldError message={error} id={errorId} />
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;

import { forwardRef, type JSX } from 'react';

import FieldError from '@features/forms/components/field-error/field-error.tsx';

import type { FormFieldProps } from '@features/forms/model/interfaces/form-field-props.interface.ts';

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, error, className, ...rest }, ref): JSX.Element => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="form__field">
        <label className="form__label" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`form-input${error ? ' form-input--error' : ''}${className ? ` ${className}` : ''}`}
          {...rest}
        />
        <FieldError message={error} id={errorId} />
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;

import { forwardRef, type JSX } from 'react';

import FieldError from '@features/forms/components/field-error/field-error.tsx';

import type { FormSelectProps } from '@features/forms/model/interfaces/form-select-props.interface.ts';

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    { id, label, options, placeholder, error, className, ...rest },
    ref
  ): JSX.Element => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="form__field">
        <label className="form__label" htmlFor={id}>
          {label}
        </label>
        <select
          id={id}
          ref={ref}
          className={`form-input${error ? ' form-input--error' : ''}${className ? ` ${className}` : ''}`}
          {...rest}
        >
          {placeholder !== undefined && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <FieldError message={error} id={errorId} />
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;

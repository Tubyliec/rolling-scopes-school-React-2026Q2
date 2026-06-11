import type { JSX } from 'react';

import { getPasswordStrength } from '@features/forms/utilities/get-password-strength.ts';

import type { PasswordStrengthProps } from '@features/forms/model/types/password-strength-props.type.ts';

import './password-strength.scss';

function PasswordStrengthIndicator({
  password,
}: PasswordStrengthProps): JSX.Element | null {
  if (!password) return null;

  const { score, hasUppercase, hasLowercase, hasNumber, hasSpecial, label } =
    getPasswordStrength(password);

  const checkMetClass = 'password-strength__check--met';
  const checkUnmetClass = 'password-strength__check--unmet';
  const segmentBaseClass = 'password-strength__segment';

  return (
    <div className="password-strength">
      <div className="password-strength__bar">
        {[1, 2, 3, 4].map((level) => {
          const segmentClass = level <= score ? label : 'empty';
          return (
            <div
              key={level}
              className={`${segmentBaseClass} ${segmentBaseClass}--${segmentClass}`}
            />
          );
        })}
      </div>
      <span
        className={`password-strength__label password-strength__label--${label}`}
      >
        {label}
      </span>
      <ul className="password-strength__checklist">
        <li className={hasUppercase ? checkMetClass : checkUnmetClass}>
          Uppercase letter
        </li>
        <li className={hasLowercase ? checkMetClass : checkUnmetClass}>
          Lowercase letter
        </li>
        <li className={hasNumber ? checkMetClass : checkUnmetClass}>Number</li>
        <li className={hasSpecial ? checkMetClass : checkUnmetClass}>
          Special character
        </li>
      </ul>
    </div>
  );
}

export default PasswordStrengthIndicator;

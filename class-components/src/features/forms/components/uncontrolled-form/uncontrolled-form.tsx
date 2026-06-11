import { type JSX, useRef, useState } from 'react';

import CountryAutocomplete from '@features/forms/components/country-autocmplete/country-autocomplete.tsx';
import FieldError from '@features/forms/components/field-error/field-error.tsx';
import FormCheckbox from '@features/forms/components/form-checkbox/form-checkbox.tsx';
import FormField from '@features/forms/components/form-field/form-field.tsx';
import FormSelect from '@features/forms/components/form-select/form-select.tsx';
import PasswordStrengthIndicator from '@features/forms/components/password-strength/password-strength.tsx';
import { useFormsStore } from '@features/forms/store/forms-store.ts';
import { fileToBase64 } from '@features/forms/utilities/file-to-base64.ts';
import { validateFormData } from '@features/forms/utilities/validate-form-data.ts';

import { GENDER_OPTIONS } from '@shared/constants/gender-constants.ts';

import type { UncontrolledFormProps } from '@features/forms/model/types/form-props-uncontrolled.type.ts';
import type { FormSubmission } from '@features/forms/model/types/form-submission.type.ts';

import '../../styles/form.scss';

function UncontrolledForm({ onSuccess }: UncontrolledFormProps): JSX.Element {
  const addSubmission = useFormsStore((state) => state.addSubmission);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordValue, setPasswordValue] = useState('');
  const [countryValue, setCountryValue] = useState('');

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const rawData = {
      name: nameRef.current?.value ?? '',
      age: ageRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      gender: genderRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      confirmPassword: confirmPasswordRef.current?.value ?? '',
      country: countryValue,
      image: imageRef.current?.files ?? null,
      agreedToTerms: termsRef.current?.checked ?? false,
    };

    const validation = validateFormData(rawData as Record<string, unknown>);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    const imageFile = imageRef.current?.files?.[0];
    const imageBase64 = imageFile ? await fileToBase64(imageFile) : '';

    const submission: Omit<FormSubmission, 'id' | 'submittedAt' | 'isNew'> = {
      name: rawData.name,
      age: Number(rawData.age),
      email: rawData.email,
      gender: rawData.gender as FormSubmission['gender'],
      country: countryValue,
      imageBase64,
      agreedToTerms: true,
    };

    addSubmission(submission);
    onSuccess();
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <FormField
        id="uc-name"
        label="Name"
        ref={nameRef}
        type="text"
        placeholder="Enter your name"
        error={errors['name']}
      />

      <FormField
        id="uc-age"
        label="Age"
        ref={ageRef}
        type="number"
        placeholder="Enter your age"
        min="0"
        error={errors['age']}
      />

      <FormField
        id="uc-email"
        label="Email"
        ref={emailRef}
        type="email"
        placeholder="Enter your email"
        error={errors['email']}
      />

      <FormSelect
        id="uc-gender"
        label="Gender"
        ref={genderRef}
        options={GENDER_OPTIONS}
        placeholder="Select gender"
        defaultValue=""
        error={errors['gender']}
      />

      <div className="form__field">
        <FormField
          id="uc-password"
          label="Password"
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
          error={errors['password']}
          onChange={handlePasswordChange}
        />
        <PasswordStrengthIndicator password={passwordValue} />
      </div>

      <FormField
        id="uc-confirm-password"
        label="Confirm Password"
        ref={confirmPasswordRef}
        type="password"
        placeholder="Confirm password"
        error={errors['confirmPassword']}
      />

      <div className="form__field">
        <label className="form__label" htmlFor="uc-country">
          Country
        </label>
        <CountryAutocomplete
          id="uc-country"
          value={countryValue}
          onChange={setCountryValue}
          errorId={errors['country'] ? 'uc-country-error' : undefined}
          hasError={Boolean(errors['country'])}
        />
        <FieldError message={errors['country']} id="uc-country-error" />
      </div>

      <FormField
        id="uc-image"
        label="Profile Image (PNG or JPEG, max 5MB)"
        ref={imageRef}
        type="file"
        accept="image/png, image/jpeg"
        error={errors['image']}
      />

      <FormCheckbox
        id="uc-terms"
        label="I accept the Terms and Conditions"
        ref={termsRef}
        error={errors['agreedToTerms']}
      />

      <div className="form__actions">
        <button type="submit" className="form__submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default UncontrolledForm;

import { type JSX, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import CountryAutocomplete from '@/features/forms/components/country-autocmplete/country-autocomplete.tsx';
import FieldError from '@/features/forms/components/field-error/field-error.tsx';
import FormCheckbox from '@/features/forms/components/form-checkbox/form-checkbox.tsx';
import FormField from '@/features/forms/components/form-field/form-field.tsx';
import FormSelect from '@/features/forms/components/form-select/form-select.tsx';
import PasswordStrengthIndicator from '@/features/forms/components/password-strength/password-strength.tsx';
import { formSchema } from '@/features/forms/schema/form-schema.ts';
import { useFormsStore } from '@/features/forms/store/forms-store.ts';
import { fileToBase64 } from '@/features/forms/utilities/file-to-base64.ts';

import { GENDER_OPTIONS } from '@shared/constants/gender-constants.ts';

import { zodResolver } from '@hookform/resolvers/zod';

import type { FormSubmission } from '@/features/forms/model/types/form-submission.type.ts';
import type { FormSchema } from '@/features/forms/schema/form-schema.ts';

import '../../styles/form.scss';

interface RhfFormProps {
  onSuccess: () => void;
}

function RhfForm({ onSuccess }: RhfFormProps): JSX.Element {
  const addSubmission = useFormsStore((state) => state.addSubmission);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  const onSubmit = async (data: FormSchema): Promise<void> => {
    setIsSubmitting(true);
    try {
      const imageFile = data.image[0];
      const imageBase64 = imageFile ? await fileToBase64(imageFile) : '';

      const submission: Omit<FormSubmission, 'id' | 'submittedAt' | 'isNew'> = {
        name: data.name,
        age: Number(data.age),
        email: data.email,
        gender: data.gender,
        country: data.country,
        imageBase64,
        agreedToTerms: true,
      };

      addSubmission(submission);
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField
        id="rhf-name"
        label="Name"
        type="text"
        placeholder="Enter your name"
        error={errors.name?.message}
        {...register('name')}
      />

      <FormField
        id="rhf-age"
        label="Age"
        type="number"
        placeholder="Enter your age"
        min="0"
        error={errors.age?.message}
        {...register('age')}
      />

      <FormField
        id="rhf-email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Controller
        name="gender"
        control={control}
        defaultValue={'male'}
        render={({ field }): JSX.Element => (
          <FormSelect
            id="rhf-gender"
            label="Gender"
            options={GENDER_OPTIONS}
            placeholder="Select gender"
            error={errors.gender?.message}
            {...field}
          />
        )}
      />

      <div className="form__field">
        <FormField
          id="rhf-password"
          label="Password"
          type="password"
          placeholder="Enter password"
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordStrengthIndicator password={passwordValue ?? ''} />
      </div>

      <FormField
        id="rhf-confirm-password"
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <div className="form__field">
        <label className="form__label" htmlFor="rhf-country">
          Country
        </label>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }): JSX.Element => (
            <CountryAutocomplete
              id="rhf-country"
              value={field.value}
              onChange={field.onChange}
              errorId={errors.country ? 'rhf-country-error' : undefined}
              hasError={!!errors.country}
            />
          )}
        />
        <FieldError message={errors.country?.message} id="rhf-country-error" />
      </div>

      <FormField
        id="rhf-image"
        label="Profile Image (PNG or JPEG, max 5MB)"
        type="file"
        accept="image/png, image/jpeg"
        error={errors.image?.message as string | undefined}
        {...register('image')}
      />

      <Controller
        name="agreedToTerms"
        control={control}
        defaultValue={false}
        render={({ field: { value, onChange, ref, ...rest } }): JSX.Element => (
          <FormCheckbox
            id="rhf-terms"
            label="I accept the Terms and Conditions"
            checked={value}
            onChange={onChange}
            ref={ref}
            error={errors.agreedToTerms?.message}
            {...rest}
          />
        )}
      />

      <div className="form__actions">
        <button
          type="submit"
          className="form__submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting…' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default RhfForm;

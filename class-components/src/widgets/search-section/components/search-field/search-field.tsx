'use client';

import React, { type JSX } from 'react';

import { useTranslations } from 'next-intl';

import type { SearchFieldProps } from '../../model/types/search-field.type.ts';

import './search-field.scss';

function SearchField({
  value,
  isLoading,
  onChange,
  onSearch,
}: SearchFieldProps): JSX.Element {
  const translation = useTranslations('search');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const isEnterKey = e.key === 'Enter';
    if (isEnterKey) {
      onSearch();
    }
  };

  const buttonText = isLoading ? translation('loading') : translation('button');

  return (
    <div className="search-field">
      <div className="search-field__group">
        <label className="search-field__label" htmlFor="search-input">
          {translation('label')}
        </label>
        <div className="search-field__input-wrap">
          <input
            id="search-input"
            className="search-field__input"
            type="text"
            placeholder={translation('placeholder')}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>
      </div>

      <button
        className="search-field__btn"
        onClick={onSearch}
        disabled={isLoading}
        type="button"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default SearchField;

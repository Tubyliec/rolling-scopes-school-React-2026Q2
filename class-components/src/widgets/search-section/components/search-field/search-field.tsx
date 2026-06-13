import React, { type JSX } from 'react';

import type { SearchFieldProps } from '../../model/interfaces/search-field.interface.ts';

import './search-field.scss';

function SearchField({
  value,
  isLoading,
  onChange,
  onSearch,
}: SearchFieldProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const buttonText = isLoading ? 'FETCHING…' : 'SEARCH';

  return (
    <div className="search-field">
      <div className="search-field__group">
        <label className="search-field__label" htmlFor="search-input">
          Search term
        </label>
        <div className="search-field__input-wrap">
          <input
            id="search-input"
            className="search-field__input"
            type="text"
            placeholder="e.g. Luke Skywalker…"
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
      >
        {buttonText}
      </button>
    </div>
  );
}

export default SearchField;

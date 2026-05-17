import React, { Component, type JSX } from 'react';
import type { SearchFieldProps } from './model/interfaces/search-field.interface';
import './search-field.scss';

class SearchField extends Component<SearchFieldProps> {
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(e.target.value);
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      this.props.onSearch();
    }
  };

  public render(): JSX.Element {
    const { value, isLoading, onSearch } = this.props;

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
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          className="search-field__btn"
          onClick={onSearch}
          disabled={isLoading}
        >
          {isLoading ? 'FETCHING…' : 'SEARCH'}
        </button>
      </div>
    );
  }
}

export default SearchField;

import { Component, type JSX } from 'react';
import { KEY_SEARCH_TERM } from '../../shared/constants/search-constants.ts';
import type { SearchSectionProps } from './model/interfaces/search-section-props.interface.ts';
import type { SearchSectionState } from './model/interfaces/search-section-state.interface.ts';
import SearchField from '../search-field/search-field.tsx';
import './search-section.scss';

class SearchSection extends Component<SearchSectionProps, SearchSectionState> {
  public constructor(props: SearchSectionProps) {
    super(props);
    const savedTerm = localStorage.getItem(KEY_SEARCH_TERM) ?? '';
    this.state = { inputValue: savedTerm };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  public componentDidMount(): void {
    this.props.onSearch(this.state.inputValue);
  }

  private handleChange(value: string): void {
    this.setState({ inputValue: value });
  }

  private handleSearch(): void {
    const trimmed = this.state.inputValue.trim();
    this.setState({ inputValue: trimmed });
    this.props.onSearch(trimmed);
  }

  public render(): JSX.Element {
    const { isLoading } = this.props;
    const { inputValue } = this.state;

    return (
      <section className="search-section">
        <div className="search__wrapper wrapper">
          <SearchField
            value={inputValue}
            isLoading={isLoading}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
          />
        </div>
      </section>
    );
  }
}

export default SearchSection;

import { Component, type JSX } from 'react';
import type { AppState } from './core/model/interfaces/app-state.interface.ts';
import SearchSection from './widgets/search-section/search-section.tsx';
import { KEY_SEARCH_TERM } from './shared/constants/search-constants.ts';
import { searchPeople } from './core/services/swapi/swapi-service.ts';
import type { SearchResponse } from './core/services/swapi/model/interfaces/search-response.interface';
import Header from './widgets/header/header.tsx';
import ResultsSection from './widgets/results-sections/model/results-section.tsx';

class App extends Component<Record<string, never>, AppState> {
  public constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null,
      lastSearchTerm: null,
      shouldThrowError: false,
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSimulateError = this.handleSimulateError.bind(this);
  }

  public async handleSearch(term: string, page: number = 1): Promise<void> {
    const trimmed = term.trim();

    if (
      trimmed === this.state.lastSearchTerm &&
      page === this.state.currentPage
    ) {
      return;
    }

    localStorage.setItem(KEY_SEARCH_TERM, trimmed);
    this.setState({
      isLoading: true,
      error: null,
      results: [],
      lastSearchTerm: trimmed,
      currentPage: page,
    });

    const response: SearchResponse = await searchPeople({
      term: trimmed,
      page,
    });

    if ('message' in response) {
      this.setState({
        error: response.message,
        isLoading: false,
      });
      return;
    }

    this.setState({
      results: response.results,
      isLoading: false,
      totalCount: response.totalCount,
      totalPages: response.totalPages,
      hasNextPage: response.hasNextPage,
      hasPreviousPage: response.hasPreviousPage,
    });
  }

  private async handlePageChange(page: number): Promise<void> {
    const { lastSearchTerm } = this.state;
    if (lastSearchTerm !== null) {
      await this.handleSearch(lastSearchTerm, page);
    } else {
      await this.handleSearch('', page);
    }
  }

  private handleSimulateError(): void {
    this.setState({ shouldThrowError: true });
  }

  public render(): JSX.Element {
    if (this.state.shouldThrowError) {
      throw new Error('Simulated application error triggered by test button.');
    }

    const {
      isLoading,
      error,
      results,
      currentPage,
      totalPages,
      totalCount,
      hasNextPage,
      hasPreviousPage,
    } = this.state;

    return (
      <>
        <Header />
        <SearchSection
          onSearch={(term) => this.handleSearch(term, 1)}
          isLoading={this.state.isLoading}
        />
        <ResultsSection
          isLoading={isLoading}
          error={error}
          results={results}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onPageChange={this.handlePageChange}
        />
        <button
          className="app__error-trigger"
          onClick={this.handleSimulateError}
        >
          SIMULATE ERROR
        </button>
      </>
    );
  }
}

export default App;

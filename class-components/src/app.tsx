import { Component, type JSX } from 'react';
import type { AppState } from './core/model/interfaces/app-state.interface.ts';
import SearchSection from './widgets/search-section/search-section.tsx';
import { KEY_SEARCH_TERM } from './shared/constants/search-constants.ts';
import { buildSearchUrl } from './shared/utilities/build-search-url.ts';
import type { PersonResponse } from './entities/person/model/interfaces/person-response.interface.ts';
import { RESULTS_PER_PAGE } from './shared/constants/page-constants.ts';
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

    try {
      const url = buildSearchUrl(trimmed, page);
      const response = await fetch(url);

      if (!response.ok) {
        this.setState({
          error: `Server error ${response.status}...`,
          isLoading: false,
        });
        return;
      }

      const data: PersonResponse = await response.json();

      const totalPages = Math.ceil((data.count ?? 0) / RESULTS_PER_PAGE);

      this.setState({
        results: data.results ?? [],
        isLoading: false,
        totalCount: data.count ?? 0,
        totalPages: totalPages,
        hasNextPage: data.next !== null,
        hasPreviousPage: data.previous !== null,
      });
    } catch (err) {
      let message = 'Unknown error occurred';
      if (err instanceof Error) {
        if (
          err.message.includes('fetch') ||
          err.message.includes('Failed to fetch')
        ) {
          message =
            'Network error: Unable to connect to SWAPI server. The API certificate may be expired.';
        } else {
          message = err.message;
        }
      }
      this.setState({ error: message, isLoading: false, results: [] });
    }
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
        <button className="app__error-trigger" onClick={this.handleSimulateError}>
          SIMULATE ERROR
        </button>
      </>
    );
  }
}

export default App;
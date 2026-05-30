import { Component, type ErrorInfo, type JSX, type ReactNode } from 'react';
import './error-boundary.scss';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  readonly children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary] Caught runtime error:', error, info);
  }

  private handleReset(): void {
    this.setState({ hasError: false, error: null });
  }

  private renderFallback(): JSX.Element {
    const { error } = this.state;

    return (
      <div className="error-boundary">
        <div className="error-boundary__code">ERR</div>
        <div className="error-boundary__title">SYSTEM FAILURE</div>
        <p className="error-boundary__message">
          An unexpected error occurred in the application runtime. The error has
          been logged to the console.
        </p>
        {error !== null && (
          <div className="error-boundary__detail">
            <div className="error-boundary__detail-label">ERROR MESSAGE</div>
            {error.message}
          </div>
        )}
        <button className="error-boundary__reset" onClick={this.handleReset}>
          RESET APP
        </button>
      </div>
    );
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return this.renderFallback();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React from 'react';
import ErrorDetails from './error_details';

interface Props {
  children: React.ReactNode;
  catchErrors: 'always';
}

interface State {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<State>,
    nextContext: any,
  ): boolean {
    return nextState.error !== this.state.error;
  }

  resetError = () => {
    this.setState({error: null, errorInfo: null});
  };

  render() {
    return this.state.error ? (
      <ErrorDetails
        onReset={this.resetError}
        error={this.state.error}
        errorInfo={this.state.errorInfo}
      />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;

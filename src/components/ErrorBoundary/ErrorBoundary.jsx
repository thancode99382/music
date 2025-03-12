import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Caught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 text-white bg-gradient-to-b from-[#222222] to-[#121212]">
          <h2 className="mb-4 text-3xl font-bold text-red-500">Something went wrong</h2>
          <p className="mb-4 text-lg">We&apos;re sorry for the inconvenience. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 mb-4 text-black transition-colors bg-white rounded-full hover:bg-green-500 hover:text-white"
          >
            Refresh Page
          </button>
          {this.props.showDetails && (
            <div className="p-4 mt-4 overflow-auto text-sm text-red-300 bg-black rounded bg-opacity-60 max-h-[300px]">
              <p className="mb-2 font-bold">Error Details:</p>
              <p>{this.state.error?.toString()}</p>
              <p className="mt-2 font-bold">Component Stack:</p>
              <p className="font-mono">{this.state.errorInfo?.componentStack}</p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  showDetails: PropTypes.bool
};

ErrorBoundary.defaultProps = {
  showDetails: false
};

export default ErrorBoundary;

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-500/10 rounded-lg flex items-center gap-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <div>
            <h2 className="text-lg font-semibold text-red-500">Something went wrong</h2>
            <p className="text-gray-400">Please try refreshing the page</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
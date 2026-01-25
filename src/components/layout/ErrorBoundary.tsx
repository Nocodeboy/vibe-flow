import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    handleRetry = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-[#030303] px-6">
                    <div className="text-center max-w-md">
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-red-500/10 flex items-center justify-center">
                            <span className="text-4xl">!</span>
                        </div>
                        <h1 className="text-3xl font-display italic font-bold mb-4">
                            Algo salió mal
                        </h1>
                        <p className="text-white/60 mb-8">
                            Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest text-xs rounded-full hover:shadow-[0_0_40px_rgba(152,231,16,0.4)] transition-all"
                            >
                                Reintentar
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all"
                            >
                                Recargar Página
                            </button>
                        </div>
                        {this.state.error && (
                            <details className="mt-8 text-left">
                                <summary className="cursor-pointer text-white/40 text-sm hover:text-white/60 transition-colors">
                                    Detalles técnicos
                                </summary>
                                <pre className="mt-4 p-4 bg-white/5 rounded-lg text-xs text-white/50 overflow-auto max-h-40">
                                    {this.state.error.message}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

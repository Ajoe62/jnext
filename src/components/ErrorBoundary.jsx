"use client";

import { useEffect, useState } from 'react';

export default function ErrorBoundary({
    children,
}) {
    const [error, setError] = useState(null);
    const [errorInfo, setErrorInfo] = useState(null);

    useEffect(() => {
        const errorHandler = (event) => {
            console.error('Caught in error boundary:', event.error);
            setError(event.error || new Error('Unknown error occurred'));
            setErrorInfo({
                componentStack: 'Error occurred in browser',
                message: event.message || 'Unknown error'
            });

            // Prevent the error from propagating further
            event.preventDefault();
            return true;
        };

        // Handle runtime errors
        window.addEventListener('error', errorHandler);

        // Handle promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            setError(event.reason || new Error('Unhandled Promise Rejection'));
            setErrorInfo({
                componentStack: 'Unhandled Promise Rejection',
                message: event.reason?.message || 'Unknown promise rejection'
            });
        });

        return () => {
            window.removeEventListener('error', errorHandler);
            window.removeEventListener('unhandledrejection', errorHandler);
        };
    }, []);

    if (error) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-primary p-4">
                <div className="max-w-2xl w-full bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
                    <div className="bg-black/30 p-4 rounded mb-4 overflow-auto">
                        <pre className="text-white/80 text-sm whitespace-pre-wrap">
                            {error.toString()}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-accent text-primary px-4 py-2 rounded hover:bg-accent/80 transition-colors"
                    >
                        Try reloading the page
                    </button>
                </div>
            </div>
        );
    }

    return children;
}

"use client";

import { useEffect, useState } from 'react';

const ClientOnly = ({ children, fallback = null }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      // Debug info
      console.log('ClientOnly component mounted');
      setHasMounted(true);
    } catch (error) {
      console.error('Error in ClientOnly mounting:', error);
      setHasError(true);
    }

    // Add a safety timeout to ensure we don't get stuck in loading state
    const timeout = setTimeout(() => {
      setHasMounted(prev => {
        if (!prev) {
          console.warn('Force setting hasMounted due to timeout');
        }
        return true;
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-primary text-white">
        <div className="text-center max-w-lg p-6">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Application</h2>
          <p className="mb-4">There was a problem initializing the application. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent text-primary px-4 py-2 rounded"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!hasMounted) {
    return fallback || (
      <div className="min-h-screen w-full flex items-center justify-center bg-primary text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-lg font-medium">Loading your experience...</p>
          <p className="text-sm text-white/60 mt-2">Please wait while we initialize the application...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ClientOnly;

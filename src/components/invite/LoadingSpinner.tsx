
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-earth-50">
      <div className="animate-pulse text-earth-600">Loading invitation...</div>
    </div>
  );
};

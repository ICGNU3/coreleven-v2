
import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { PrimaryButton } from '@/components/PrimaryButton';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-medium mb-4 text-earth-700">404</h1>
        <p className="text-xl text-stone-600 mb-8">
          This page doesn't exist in our circle.
        </p>
        <PrimaryButton asChild>
          <Link to="/">Return Home</Link>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default NotFound;

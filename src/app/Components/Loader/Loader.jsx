import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[var(--color-primary)]"></div>
    </div>
  );
}
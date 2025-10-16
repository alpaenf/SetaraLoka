import React from 'react';

export default function SkeletonCard({ lines = 2 }) {
  return (
    <div className="animate-pulse rounded-lg border bg-white/40 backdrop-blur p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-3 bg-gray-200/80 rounded w-full" />
      ))}
      <div className="h-[40px] bg-gray-100 rounded" />
    </div>
  );
}

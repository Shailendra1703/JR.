"use client";

import { TraceTable } from "./TraceTable";

type Hop = {
  url: string;
  statusCode: number;
};

type TrackingResult = {
  hops: Hop[];
  finalUrl: string;
};

interface ResultsDisplayProps {
  result: TrackingResult | null;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  if (!result) return null;

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Redirect Trace Results</h2>
      <TraceTable result={result} />
      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Final Destination
        </h3>
        <p className="text-blue-600 dark:text-blue-400 break-all">
          {result.finalUrl}
        </p>
      </div>
    </div>
  );
}

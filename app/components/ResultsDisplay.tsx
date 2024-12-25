'use client'

import { ArrowDown } from 'lucide-react'

type Hop = {
  url: string
  statusCode: number
}

type TrackingResult = {
  hops: Hop[]
  finalUrl: string
}

interface ResultsDisplayProps {
  result: TrackingResult | null
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  if (!result) return null

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {result.hops.map((hop, index) => (
          <div key={index} className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Hop {index + 1}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    hop.statusCode === 200
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  Status: {hop.statusCode}
                </span>
              </div>
              <p className="text-blue-600 dark:text-blue-400 break-all">{hop.url}</p>
            </div>
            {index < result.hops.length - 1 && (
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-10">
                <ArrowDown className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Final Destination</h3>
        <p className="text-blue-600 dark:text-blue-400 break-all">{result.finalUrl}</p>
      </div>
    </div>
  )
}


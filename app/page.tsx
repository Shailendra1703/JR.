"use client";

import { useState } from "react";
import Header from "@/components/Header";
import UrlForm from "@/components/UrlForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import { Footer } from "@/components/Footer";

type Hop = {
  url: string;
  statusCode: number;
};

type TrackingResult = {
  hops: Hop[];
  finalUrl: string;
};

export default function Home() {
  const [result, setResult] = useState<TrackingResult | null>(null);

  const handleTrackUrl = (trackingResult: TrackingResult) => {
    setResult(trackingResult);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            URL Redirect Tracker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track the journey of your shortened URLs through the web
          </p>
        </div>
        <UrlForm onSubmit={handleTrackUrl} />
        <ResultsDisplay result={result} />
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { isValidUrl } from "@/app/utils/validation";
interface UrlFormProps {
  onSubmit: (result: any) => void;
}

export default function UrlForm({ onSubmit }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/trace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      onSubmit(result);
    } catch (err) {
      setError("An error occurred while tracking the URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL to track"
          className="w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
        >
          {loading ? "Tracking..." : "Track URL"}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-500 dark:text-red-400 text-center">
          {error}
        </p>
      )}
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const router = useRouter();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (question.trim()) {
      router.push(`/solutions/${question.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4 tracking-tight">
          🧠 LeetCode Solutions
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter the question number to find curated solutions by Centinoughty.
        </p>

        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. 1, 206, 1234"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            aria-label="Enter LeetCode question number"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition hover:scale-[1.02] active:scale-100"
          >
            🔍 Find Solution
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Code {
  code: string;
  language: string;
}

const LANGUAGES = ["py", "c", "cpp"];

export default function Home() {
  const { id } = useParams();
  const [codes, setCodes] = useState<Code[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (id) {
      const fetchSolutions = async () => {
        setLoading(true);
        setError("");
        setCodes([]);

        try {
          const requests = LANGUAGES.map((language) =>
            axios
              .get(`/api/get-solution?questionId=${id}&language=${language}`)
              .then((response) => ({
                success: true,
                data: response.data,
              }))
              .catch(() => ({
                success: false,
              }))
          );

          const results = await Promise.allSettled(requests);

          const validCodes = results
            .filter((r) => r.status === "fulfilled" && r.value.success)
            .map((r) => (r as any).value.data);

          setCodes(validCodes);
        } catch (err) {
          console.error(err);
          setError("Something went wrong.");
        } finally {
          setLoading(false);
        }
      };

      fetchSolutions();
    }
  }, [id]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Centinoughty Solutions
      </h1>

      {loading && (
        <p className="text-blue-600 text-center animate-pulse">
          Loading solutions...
        </p>
      )}

      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && codes.length === 0 && !error && (
        <p className="text-center text-gray-500">
          Centinoughty has not solved this question yet.
        </p>
      )}

      <div className="space-y-6">
        {codes.map((code, idx) => (
          <div
            key={idx}
            className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto relative"
          >
            <span className="absolute top-2 right-3 text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full uppercase">
              {code.language}
            </span>
            <pre className="whitespace-pre-wrap break-words font-mono text-sm">
              {code.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

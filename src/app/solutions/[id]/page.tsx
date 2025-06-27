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
              .then((response) => {
                console.log("1");
                return { success: true, data: response.data };
              })
              .catch((err) => {
                return { success: false };
              })
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
    <>
      <div>
        {codes.map((code, idx) => (
          <pre key={idx}>{code.code}</pre>
        ))}
      </div>
    </>
  );
}

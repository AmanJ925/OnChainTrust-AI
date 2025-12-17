"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultCard from "@/components/ResultCard";

// Type definitions
interface Risk {
  level: "low" | "medium" | "high";
  message: string;
}

interface AnalyzeResult {
  address: string;
  trustScore: number;
  risks: Risk[];
  explanation: string;
}

export default function AnalyzePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const address = searchParams.get("address") || "";

  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!address) {
      setError("No address provided in query params.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch analysis");
        }
        return res.json();
      })
      .then((data) => {
        setResult(data);
      })
      .catch((e) => {
        setError(e.message || "Unexpected error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [address]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex w-full max-w-xl flex-col items-center rounded-xl bg-zinc-950 px-8 py-14 shadow-xl border border-zinc-900">
        <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-zinc-50">
          Smart Contract Analysis
        </h1>

        {loading ? (
          <div className="text-lg text-zinc-400 py-10 animate-pulse">
            Analyzing smart contract…
          </div>
        ) : error ? (
          <div className="text-red-400 py-10 text-center font-medium text-lg">
            {error}
          </div>
        ) : result ? (
          <>
            {/* Result Card Replaces Details Below */}
            <ResultCard
              address={result.address}
              trustScore={result.trustScore}
              risks={result.risks}
              explanation={result.explanation}
            />
            {/* Back Button */}
            <button
              onClick={() => router.push("/")}
              className="mt-8 text-sm text-zinc-400 hover:text-white transition"
            >
              ← Analyze another contract
            </button>
          </>
        ) : null}
      </main>
    </div>
  );
}

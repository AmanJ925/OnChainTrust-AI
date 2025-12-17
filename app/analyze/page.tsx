"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Type definitions for results
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
        setError("");
      })
      .catch((e) => {
        setError(e.message || "Unexpected error");
        setResult(null);
      })
      .finally(() => {
        setLoading(false);
      });
    // Only on mount (and when address changes)
  }, [address]);

  // Color by risk level
  const riskColor = (level: Risk["level"]): string =>
    level === "high"
      ? "bg-red-600 text-white"
      : level === "medium"
      ? "bg-yellow-500 text-zinc-900"
      : "bg-zinc-700 text-zinc-100";

  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col items-center rounded-xl bg-zinc-950 px-8 py-14 shadow-xl border border-zinc-900">
        <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-zinc-50">Smart Contract Analysis</h1>
        {loading ? (
          <div className="text-lg text-zinc-400 py-10 animate-pulse">Analyzing contract...</div>
        ) : error ? (
          <div className="text-red-400 py-10 text-center font-medium text-lg">{error}</div>
        ) : result ? (
          <>
            <div className="my-6 flex flex-col items-center">
              <span className="uppercase tracking-widest text-zinc-400 text-sm">Trust Score</span>
              <span className="mt-1 text-[3rem] font-extrabold text-blue-500 drop-shadow-lg">{result.trustScore}</span>
              <span className="mt-2 text-xs text-zinc-500">for {result.address.slice(0, 8)}...{result.address.slice(-5)}</span>
            </div>
            <div className="w-full flex flex-wrap gap-2 justify-center mb-7">
              {result.risks.map((risk, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-lg font-semibold text-xs ${riskColor(risk.level)}`}
                >
                  {risk.level.toUpperCase()}: {risk.message}
                </span>
              ))}
            </div>
            <div className="w-full">
              <div className="bg-zinc-900 rounded-lg p-6 text-zinc-200 shadow-lg border border-zinc-800 text-base max-w-full whitespace-pre-line">
                {result.explanation}
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}


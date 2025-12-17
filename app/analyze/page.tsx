"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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

  // 🔥 Trust score color logic (THIS IS WHAT YOU ASKED)
  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  // 🎨 Risk badge colors
  const riskColor = (level: Risk["level"]) =>
    level === "high"
      ? "bg-red-500/20 text-red-400 border border-red-500/30"
      : level === "medium"
      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      : "bg-green-500/20 text-green-400 border border-green-500/30";

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
            {/* Trust Score */}
            <div className="my-6 flex flex-col items-center">
              <span className="uppercase tracking-widest text-zinc-400 text-sm">
                Trust Score
              </span>
              <span
                className={`mt-1 text-[3.5rem] font-extrabold drop-shadow-lg ${scoreColor(
                  result.trustScore
                )}`}
              >
                {result.trustScore}
              </span>
              <span className="mt-2 text-xs text-zinc-500">
                for {result.address.slice(0, 8)}...
                {result.address.slice(-5)}
              </span>
            </div>

            {/* Risk Badges */}
            <div className="w-full flex flex-wrap gap-2 justify-center mb-7">
              {result.risks.map((risk, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${riskColor(
                    risk.level
                  )}`}
                >
                  {risk.level.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Explanation */}
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                AI Risk Explanation
              </h3>
              <div className="bg-white/5 rounded-xl p-5 text-zinc-300 leading-relaxed border border-zinc-800">
                {result.explanation}
              </div>
            </div>

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

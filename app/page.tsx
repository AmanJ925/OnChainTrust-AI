"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!address.trim()) {
      setError("Please enter a contract address.");
      return;
    }
    setLoading(true);
    router.push(`/analyze?address=${address.trim()}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center rounded-xl bg-zinc-950 px-8 py-12 shadow-lg">
        <h1 className="mb-2 text-center text-4xl font-bold tracking-tight text-zinc-50">OnChainTrust AI</h1>
        <p className="mb-8 text-center text-lg text-zinc-400">AI-powered smart contract trust analysis</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-5">
          <input
            type="text"
            className="w-full rounded-lg bg-zinc-900 p-4 text-zinc-200 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ethereum contract address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            disabled={loading}
            autoFocus
          />
          {error && (
            <span className="text-sm text-red-400 w-full text-left">{error}</span>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-zinc-700"
          >
            {loading ? "Analyzing..." : "Analyze Contract"}
          </button>
        </form>
      </main>
    </div>
  );
}


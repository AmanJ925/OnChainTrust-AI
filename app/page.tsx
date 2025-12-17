"use client";
import { useRouter } from "next/navigation";
import AddressForm from "@/components/AddressForm";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = (formAddress: string) => {
    setLoading(true);
    router.push(`/analyze?address=${formAddress}`);
  };

  // Modern, visually enhanced SaaS Homepage UI
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center font-sans" style={{ background: '#0A0A0B' }}>
      {/* Abstract Indigo Glow Top-Left */}
      <div
        className="pointer-events-none select-none absolute -top-32 -left-32 w-[50vw] h-[50vw] rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.23) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(64px)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      {/* Abstract Cyan Glow Bottom-Right */}
      <div
        className="pointer-events-none select-none absolute -bottom-32 -right-32 w-[45vw] h-[45vw] rounded-full"
        style={{
          background: 'radial-gradient(circle at 70% 80%, rgba(34,211,238,0.18) 0%, rgba(0,0,0,0) 74%)',
          filter: 'blur(88px)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      <main className="z-10 flex w-full max-w-md flex-col items-center rounded-2xl border border-zinc-800 bg-[#111113]/70 px-8 py-14 shadow-2xl backdrop-blur-md">
        <h1
          className="mb-2 text-center text-5xl font-bold tracking-tighter text-zinc-100 bg-gradient-to-r from-indigo-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg"
        >
          OnChainTrust AI
        </h1>
        <p className="mb-8 text-center text-lg text-zinc-400 font-medium">AI-powered smart contract trust analysis</p>
        <AddressForm onSubmit={handleFormSubmit} loading={loading} />
      </main>
    </div>
  );
}


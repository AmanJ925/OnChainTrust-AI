"use client"

import React from "react";
import { RiskBadge } from "@/components/RiskBadge";

interface Risk {
  level: "low" | "medium" | "high";
  message: string;
}

interface ResultCardProps {
  address: string;
  trustScore: number;
  risks: Risk[];
  explanation: string;
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

const ResultCard: React.FC<ResultCardProps> = ({ address, trustScore, risks, explanation }) => {
  return (
    <section className="w-full max-w-xl flex flex-col gap-7 bg-zinc-950 border border-zinc-900 rounded-2xl shadow-lg px-8 py-10 
      dark:bg-zinc-950 dark:border-zinc-900 text-zinc-100">
      {/* Trust Score */}
      <div className="flex flex-col items-center mb-4">
        <span className="uppercase tracking-widest text-zinc-400 text-xs">
          Trust Score
        </span>
        <span className={`mt-2 text-[3rem] font-extrabold drop-shadow-lg ${getScoreColor(trustScore)}`}>
          {trustScore}
        </span>
        <span className="mt-1 text-xs text-zinc-500">
          for {address.slice(0, 8)}...{address.slice(-5)}
        </span>
      </div>

      {/* Risks List */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {risks.length === 0 ? (
          <span className="text-green-400 font-medium">No risks detected</span>
        ) : (
          risks.map((risk, i) => (
            <RiskBadge key={i} level={risk.level} message={risk.message} />
          ))
        )}
      </div>

      {/* Explanation */}
      <div className="rounded-xl bg-white/5 border border-zinc-800 px-5 py-4">
        <h3 className="font-semibold text-zinc-100 text-base mb-1">AI Risk Explanation</h3>
        <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
          {explanation}
        </p>
      </div>
    </section>
  );
};

export default ResultCard;


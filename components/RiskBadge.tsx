import React from "react";

type RiskLevel = "low" | "medium" | "high";

interface RiskBadgeProps {
  level: RiskLevel;
  message?: string;
}

const riskColors: Record<RiskLevel, string> = {
  high: "border-red-500 bg-red-500/20 text-red-500",
  medium: "border-yellow-500 bg-yellow-500/20 text-yellow-600",
  low: "border-green-500 bg-green-500/20 text-green-600",
};

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, message }) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center px-3 py-1 rounded-lg border font-semibold tracking-wide uppercase select-none 
      shadow-md backdrop-blur-sm bg-clip-padding 
      ${riskColors[level]} 
      [box-shadow:_0_2px_8px_1px_rgba(0,0,0,0.10)]`}
    >
      <span>{level}</span>
      {message && (
        <span className="text-xs font-normal normal-case mt-1 opacity-80">
          {message}
        </span>
      )}
    </div>
  );
};
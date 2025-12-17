/**
 * Analyzes blockchain heuristics for an address or contract.
 *
 * @param isContract - Whether the address is a smart contract.
 * @param bytecodeLength - Length of the contract's bytecode.
 * @param transactionCount - Number of transactions involving the address.
 * @returns Array of risk objects detailing detected risks.
 */
export type RiskLevel = "low" | "medium" | "high";

export interface Risk {
  level: RiskLevel;
  message: string;
}

export function analyzeHeuristics(
  isContract: boolean,
  bytecodeLength: number,
  transactionCount: number
): Risk[] {
  const risks: Risk[] = [];

  // 1. Check if address is not a smart contract
  if (!isContract) {
    risks.push({
      level: "high",
      message:
        "Address is not a smart contract. Only smart contracts are analyzed for these heuristics."
    });
    return risks;
  }

  // 2. Check for very low transaction count
  if (transactionCount < 5) {
    risks.push({
      level: "medium",
      message:
        "Contract has very limited transaction history, which may indicate inactivity, new deployment, or low usage."
    });
  }

  // 3. Check for unusually large bytecode length (arbitrary large threshold)
  if (bytecodeLength > 25000) {
    risks.push({
      level: "medium",
      message:
        "Contract bytecode is unusually large, possibly indicating complex or proxy-based logic. Increased risk for vulnerabilities or unexpected behavior."
    });
  }

  // 4. If no significant risks found, return a low risk
  if (risks.length === 0) {
    risks.push({
      level: "low",
      message: "No obvious risks detected from heuristics. Standard behavior." });
  }

  return risks;
}


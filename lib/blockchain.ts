import { ethers } from "ethers";

/**
 * Analyzes an Ethereum address to check if it's a contract and returns some basic data.
 * @param address - The Ethereum address to analyze.
 * @returns {Promise<{isContract: boolean; bytecodeLength: number; transactionCount: number}>}
 */
export async function analyzeContractBasics(address: string): Promise<{
  isContract: boolean;
  bytecodeLength: number;
  transactionCount: number;
}> {
  // Get the Ethereum RPC URL from environment variables
  const rpcUrl = process.env.ETH_RPC_URL;
  if (!rpcUrl) {
    throw new Error("ETH_RPC_URL environment variable is not set");
  }

  // Create a new JSON RPC provider
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // Validate the Ethereum address
  if (!ethers.isAddress(address)) {
    return {
      isContract: false,
      bytecodeLength: 0,
      transactionCount: 0,
    };
  }

  // Fetch bytecode and transaction count
  const [bytecode, transactionCount] = await Promise.all([
    provider.getCode(address),
    provider.getTransactionCount(address),
  ]);

  const isContract = bytecode !== "0x";
  return {
    isContract,
    bytecodeLength: bytecode === "0x" ? 0 : (bytecode.length - 2) / 2, // byte length: minus '0x'
    transactionCount,
  };
}


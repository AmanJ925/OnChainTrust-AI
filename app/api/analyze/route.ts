export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import { analyzeContractBasics } from '@/lib/blockchain';
import { analyzeHeuristics } from '@/lib/heuristics';
import { generateRiskExplanation } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const address: string = body?.address;

    // Ethereum address validation (basic)
    if (!address || typeof address !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json({ error: 'Invalid Ethereum address.' }, { status: 400 });
    }

    // Blockchain analysis
    const basics = await analyzeContractBasics(address);
    const risks = analyzeHeuristics(basics.isContract, basics.bytecodeLength, basics.transactionCount);
    const explanation = await generateRiskExplanation(risks);

    // Compute trust score
    let trustScore = 100;
    for (const r of risks) {
      if (r.level === 'high') trustScore -= 30;
      else if (r.level === 'medium') trustScore -= 15;
      else if (r.level === 'low') trustScore -= 5;
    }
    if (trustScore < 0) trustScore = 0;

    return NextResponse.json({
      address,
      trustScore,
      risks,
      explanation,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}


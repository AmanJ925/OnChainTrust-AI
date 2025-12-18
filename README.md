🛡️ OnChainTrust AI

AI-Powered Smart Contract Trust Analysis Platform

OnChainTrust AI is a blockchain security analysis tool that evaluates Ethereum smart contracts and provides a trust score, risk breakdown, and plain-language AI explanations to help users assess potential risks before interacting with a contract.

--




🚀 Features

1)  Smart Contract Analysis

    - Validates Ethereum contract addresses

    - Detects contract bytecode & basic activity

2)  Risk Heuristics Engine

    - Flags low usage, inactivity, and suspicious patterns

3)  AI-Generated Explanations

    - Converts technical risks into non-technical insights

4)  Trust Score

    - Aggregated score (0–100) indicating contract reliability

5)  Modern Dark UI

    - Clean, minimal, developer-friendly interface




-- 

🧩 Tech Stack
 1) Frontend 

    - Next.js (App Router)

    - React

    - Tailwind CSS

 2) Backend

    - Next.js API Routes

    - Ethers.js (v6)

    - Custom heuristic engine

 3) Blockchain & AI

    - Ethereum JSON-RPC (Alchemy)

    - OpenAI API (risk explanation)
   
--

📷 Screenshots:-

<img width="1920" height="962" alt="Screenshot From 2025-12-18 15-15-48" src="https://github.com/user-attachments/assets/3aaf4330-4951-4bf3-aacd-2b5ff02fe82e" />


<img width="1920" height="962" alt="Screenshot From 2025-12-18 15-15-06" src="https://github.com/user-attachments/assets/217b57d9-2824-4a55-ba6e-2106279cb7f7" />

--

⚙️ Environment Variables

Create a `.env.local` file:-

```bash
ETH_RPC_URL=your_ethereum_rpc_url
AI_API_KEY=your_openai_api_key
```
-- 

🧪 Local Setup

```bash
git clone https://github.com/AmanJ925/OnChainTrust-AI.git
cd OnChainTrust-AI
npm install
npm run dev
```
Then Visit: `http://localhost:3000`


-- 

🧠 How It Works

1) User submits an Ethereum smart contract address

2) Backend:

    - Validates address

    - Fetches contract bytecode

    - Applies heuristic risk rules

3) AI generates a non-technical explanation of risks

4) UI displays:

    - Trust score

    - Risk levels

    - AI explanation

--

⚠️ Disclaimer

This tool is for informational purposes only and does not constitute financial or security advice.

--


✨ Future Improvements

1) Multi-chain support

2) Advanced contract pattern detection

3) Historical contract behavior tracking

4) Wallet integration



Thank you.


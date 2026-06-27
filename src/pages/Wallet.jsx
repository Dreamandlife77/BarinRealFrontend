import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ArrowLeft, Wallet, ShieldCheck, Coins } from "lucide-react";

import BottomNav from "../components/BottomNav";
import StakingPanel from "../components/StakingPanel";
import { useEffect } from "react";

// your icons
import MetaMaskIcon from "../assets/Wallet/Metamask.png";
import CoinbaseIcon from "../assets/Wallet/Coinbase.png";
import WalletConnectIcon from "../assets/Wallet/WalletConnect.png";

export default function WalletPage() {
  const navigate = useNavigate();

  const { address, isConnected } = useAccount();
  const {
  connectAsync,
  connectors,
  isPending,
} = useConnect();

 console.log("Connectors:", connectors);

connectors.forEach((c) => {
  console.log({
    id: c.id,
    name: c.name,
    type: c.type,
  });
});

useEffect(() => {
  const printTimes = () => {
    const now = new Date();

    console.log("================================");
    console.log("🖥️ Local Date :", now.toString());
    console.log("🌍 UTC Date   :", now.toUTCString());
    console.log("📅 ISO        :", now.toISOString());

    console.log(
      "⏰ Unix (ms):",
      now.getTime()
    );

    console.log(
      "⏰ Unix (sec):",
      Math.floor(now.getTime() / 1000)
    );

    console.log(
      "Timezone:",
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );

    console.log(
      "UTC Offset (minutes):",
      now.getTimezoneOffset()
    );

    console.log("================================");
  };

  printTimes();
}, []);

  const { disconnect } = useDisconnect();

  // -------------------------
  // CONNECT HANDLER (IMPORTANT FIX)
  // -------------------------
const handleConnect = async (connectorId) => {
  try {
    const connector = connectors.find(
      (c) => c.id === connectorId
    );

    if (!connector) {
      console.error(
        "❌ Connector not found:",
        connectorId
      );
      console.log(connectors);
      return;
    }

    console.log(
      "🔗 Connecting with:",
      connector.name
    );

    const result = await connectAsync({
      connector,
    });

    console.log(
      "✅ Connected:",
      result
    );

  } catch (err) {
    console.error(
      "❌ Wallet connect error:",
      err
    );
  }
};

  return (
    <div className="min-h-screen bg-[#020617] pb-24 text-white">

      {/* HEADER */}
      <div className="p-4 flex items-center justify-between">

        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center"
        >
          <ArrowLeft />
        </button>

        <h1 className="text-xl font-bold">Wallet</h1>

        <div className="w-10" />
      </div>

      {/* WALLET STATUS */}
      <div className="px-4">

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
              <Wallet className="text-black" />
            </div>

            <div>
              <div className="text-slate-400 text-sm">
                Connected Wallet
              </div>

              <div className="text-white font-bold">
                {isConnected
                  ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                  : "Not Connected"}
              </div>
            </div>

          </div>

          {isConnected ? (
            <button
              onClick={() => disconnect()}
              className="mt-4 w-full py-2 rounded-lg bg-red-500 text-white font-bold"
            >
              Disconnect
            </button>
          ) : null}

        </div>

      </div>

      {/* WALLET CONNECT OPTIONS (ONLY THIS SECTION) */}
      <div className="px-4 mt-5">

        <div className="grid grid-cols-3 gap-3">

          {/* METAMASK */}
          <button
            onClick={() => handleConnect("metaMaskSDK")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-orange-500 transition"
          >
            <img src={MetaMaskIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">MetaMask</span>
          </button>

          {/* WALLETCONNECT */}
          <button
            onClick={() => handleConnect("walletConnect")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-purple-500 transition"
          >
            <img src={WalletConnectIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">WalletConnect</span>
          </button>

          {/* COINBASE */}
          <button
            onClick={() => handleConnect("coinbaseWalletSDK")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-blue-500 transition"
          >
            <img src={CoinbaseIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">Coinbase</span>
          </button>

        </div>

        {isPending && (
          <div className="text-center text-yellow-400 mt-3">
            Connecting...
          </div>
        )}

      </div>

      {/* STAKING */}
      <div className="px-4 mt-6">

        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="text-yellow-400" />
          <h2 className="text-lg font-bold">BARIN Staking</h2>
        </div>

        <StakingPanel />

      </div>

      {/* TIER */}
      <div className="px-4 mt-6">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">

          <div className="flex items-center gap-2 mb-2">
            <Coins className="text-yellow-400" />
            <h3 className="font-bold">Tier System</h3>
          </div>

          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Higher XP rewards</li>
            <li>• Exclusive missions</li>
            <li>• NFT drops (future)</li>
            <li>• Game multipliers</li>
          </ul>

        </div>

      </div>

      <BottomNav />

    </div>
  );
}
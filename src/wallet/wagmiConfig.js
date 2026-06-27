import { createConfig, http } from "wagmi";
import { polygon } from "wagmi/chains";
import {
  metaMask,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";

const projectId = "beb23aec824ef375771f0418bffcfd14";

// detect telegram (important for your case)
const isTelegram = typeof window !== "undefined" &&
  window.Telegram?.WebApp;

export const wagmiConfig = createConfig({
  chains: [polygon],

  connectors: [
    // ✅ MetaMask (safe everywhere)
    metaMask(),

    // ✅ WalletConnect (force QR mode safe for Telegram)
    walletConnect({
      projectId,
      showQrModal: true,
    }),

    // ⚠️ Coinbase FIX (avoid Smart Wallet crash in Telegram)
    coinbaseWallet({
      appName: "BARIN Game",

      // IMPORTANT: prevents Smart Wallet / COOP error
      headlessMode: isTelegram ? true : false,
    }),
  ],

  transports: {
    [polygon.id]: http(),
  },
});
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, sepolia, useAccount, WagmiConfig } from "wagmi";

import {
	mainnet,
	polygon,
	optimism,
	arbitrum,
	goerli,
	polygonMumbai,
	optimismGoerli,
	arbitrumGoerli,
	polygonZkEvm,
	polygonZkEvmTestnet,
} from "wagmi/chains";


import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";
import { useRouter } from "next/router";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const walletConnect = new WalletConnectConnector({
  rpc: { 1: process.env.ALCHEMY_API_KEY },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
  projectId: process.env.WALLETCONNECT_PROJECT_ID, // read projectId from environment variables
})
const { chains, publicClient, webSocketPublicClient } = configureChains(
	[
		mainnet,
		sepolia,
		goerli,
		polygon,
		polygonMumbai,
		optimism,
		optimismGoerli,
		arbitrum,
		arbitrumGoerli,
		polygonZkEvm,
		polygonZkEvmTestnet
	],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "My Alchemy DApp",
	projectId: 'b9f57ee89993c91abcba8e7b8315407e',
	chains,
});

const config = createConfig({
	autoConnect: true,
	connectors,
	publicClient, webSocketPublicClient
});

export { WagmiConfig, RainbowKitProvider };

function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig config={config}>
			<RainbowKitProvider
				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
				chains={chains}
			>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;

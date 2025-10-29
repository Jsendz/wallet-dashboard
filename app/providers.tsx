"use client";

import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme as rainbowDark,
  lightTheme as rainbowLight,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia, polygonAmoy } from "wagmi/chains";
import { ReactNode, useState } from "react";

// IMPORTANT: import ThemeProvider normally
import { ThemeProvider as RealThemeProvider } from "next-themes";

// --- FIX: create a tiny wrapper component with an explicit prop type
type ThemeWrapperProps = {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
};

function ThemeProviderWrapper({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = false,
}: ThemeWrapperProps) {
  // We forward props to next-themes ThemeProvider.
  // We cast to any to avoid the bad 'children' type in ThemeProviderProps.
  return (
    <RealThemeProvider
      {...({
        attribute,
        defaultTheme,
        enableSystem,
      } as any)}
    >
      {children}
    </RealThemeProvider>
  );
}

// wagmi / rainbowkit config
export const wagmiConfig = getDefaultConfig({
  appName: "Web3 Identity Dashboard",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // <- replace with real WalletConnect ID
  chains: [sepolia, polygonAmoy],
  ssr: true,
});

export function AppProviders({ children }: { children: ReactNode }) {
  // react-query client for wagmi
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProviderWrapper attribute="class" defaultTheme="dark" enableSystem={false}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            modalSize="compact"
            theme={{
              lightMode: rainbowLight({
                accentColor: "#6366f1",
                accentColorForeground: "#fff",
                borderRadius: "large",
              }),
              darkMode: rainbowDark({
                accentColor: "#6366f1",
                accentColorForeground: "#fff",
                borderRadius: "large",
              }),
            }}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProviderWrapper>
  );
}

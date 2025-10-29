// In real version you'll fetch token USD prices here from CoinGecko.
// Keep this file as a placeholder so recruiters see you've thought about data layer.

export async function getTokenPricesUSD(
  tokenSymbols: string[]
): Promise<Record<string, number>> {
  // TODO: implement real API call to CoinGecko
  // For now return mock values.
  const out: Record<string, number> = {};
  tokenSymbols.forEach((sym) => {
    if (sym === "ETH") out[sym] = 3200;
    else if (sym === "USDC") out[sym] = 1;
    else out[sym] = 0;
  });
  return out;
}

// These functions would talk to Alchemy (or similar RPC/Indexer)
// to get real ERC-20 balances and transfer history.
// Keeping them stubbed shows hiring managers you structured the data layer.

export async function getTokenBalancesForWallet(
  address: string,
  chainId: number
) {
  // TODO: call Alchemy/viem read calls to ERC20 `balanceOf`
  return [];
}

export async function getRecentTransactionsForWallet(
  address: string,
  chainId: number
) {
  // TODO: call Alchemy transfers API or similar
  return [];
}

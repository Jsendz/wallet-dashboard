import { sepolia, polygonAmoy } from "wagmi/chains";

export function getAddressExplorerUrl(
  chainId: number | undefined,
  address: string | undefined
) {
  if (!chainId || !address) return null;

  if (chainId === sepolia.id) {
    return `https://sepolia.etherscan.io/address/${address}`;
  }

  if (chainId === polygonAmoy.id) {
    return `https://www.oklink.com/amoy/address/${address}`;
  }

  return null;
}

export function getTxExplorerUrl(
  chainId: number | undefined,
  txHash: string | undefined
) {
  if (!chainId || !txHash) return null;

  if (chainId === sepolia.id) {
    return `https://sepolia.etherscan.io/tx/${txHash}`;
  }

  if (chainId === polygonAmoy.id) {
    return `https://www.oklink.com/amoy/tx/${txHash}`;
  }

  return null;
}

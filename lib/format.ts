export function shortenAddress(addr: string, chars = 4) {
  if (!addr) return "";
  return `${addr.slice(0, 2 + chars)}…${addr.slice(-chars)}`;
}

export function shortenHash(hash: string, chars = 4) {
  if (!hash) return "";
  return `${hash.slice(0, 2 + chars)}…${hash.slice(-chars)}`;
}

// Token amounts like 0.123456 -> "0.1235"
export function formatTokenAmount(amount: number) {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

// Currency like 1234.5 -> "$1,234.50"
export function formatCurrency(v: number) {
  return v.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

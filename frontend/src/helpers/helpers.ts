export function walletAddressShortener(address: string) {
  return `${address.slice(0, 8)}...${address.substring(address.length - 4)}`;
}

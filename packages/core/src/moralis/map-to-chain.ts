import Moralis from "moralis";

export const mapToChain = (chainId?: number | string) => {
  if (!chainId) return Moralis.EvmUtils.EvmChain.ETHEREUM;

  switch (+chainId) {
    case 1:
      return Moralis.EvmUtils.EvmChain.ETHEREUM;
    case 56:
      return Moralis.EvmUtils.EvmChain.BSC;
    default:
      return Moralis.EvmUtils.EvmChain.ETHEREUM;
  }
};

import Moralis from "moralis";
import { GetWalletNetWorthOperationRequest } from "moralis/common-evm-utils";

export class MoralisRepository {
  static getWalletHistory(address: string) {
    return Moralis.EvmApi.wallets.getWalletHistory({
      address,
      limit: 10,
    });
  }

  static getWalletTokenTransfers(address: string) {
    return Moralis.EvmApi.token.getWalletTokenTransfers({
      address,
      limit: 10,
    });
  }

  static getWalletNftTransfers(address: string) {
    return Moralis.EvmApi.nft.getWalletNFTTransfers({
      address,
      limit: 10,
    });
  }

  static getTokenBalancesByWallet(address: string) {
    return Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
      address,
      limit: 10,
    });
  }

  static getWalletNetWorth(params: GetWalletNetWorthOperationRequest) {
    return Moralis.EvmApi.wallets.getWalletNetWorth(params);
  }
}

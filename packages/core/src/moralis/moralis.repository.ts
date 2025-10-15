import Moralis from "moralis";

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
}

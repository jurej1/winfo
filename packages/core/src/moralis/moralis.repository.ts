import Moralis from "moralis";

export class MoralisRepository {
  static getWalletHistory(address: string) {
    return Moralis.EvmApi.wallets.getWalletHistory({
      address,
    });
  }
}

import Moralis from "moralis";
import { GetWalletNetWorthOperationRequest } from "moralis/common-evm-utils";
import { Resource } from "sst";

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

  static async getWalletApprovals(address: string) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key": Resource.MoralisAPIKey.value,
      },
    };

    const response = await fetch(
      `https://deep-index.moralis.io/api/v2.2/wallets/${address}/approvals?chain=eth&limit=25`,
      options,
    );

    const body = await response.json();

    return body as {
      limit: number;
      page_size: number;
      cursor: string;
      result: {
        block_number: string;
        block_timestamp: string;
        transaction_hash: string;
        value: string;
        value_formatted: string;
        token: {
          address: string;
          address_label: string;
          name: string;
          symbol: string;
          logo: string;
          possible_spam: string;
          verified_contract: string;
          current_balance: string;
          current_balance_formatted: string;
          usd_price: string;
          usd_at_risk: string;
        };
        spender: {
          address: string;
          address_label: string;
          entity: string;
          entity_logo: string;
        };
      }[];
    };
  }

  static getMoralisProfitabilitySummary(address: string) {
    return Moralis.EvmApi.wallets.getWalletProfitabilitySummary({
      address,
    });
  }

  static getWalletProfitability(address: string) {
    return Moralis.EvmApi.wallets.getWalletProfitability({
      address,
    });
  }

  static getWalletStats(address: string) {
    return Moralis.EvmApi.wallets.getWalletStats({
      address,
    });
  }

  static getCoinMetadataBySymbol(symbol: string) {
    return Moralis.EvmApi.token.getTokenMetadataBySymbol({ symbols: [symbol] });
  }

  static getCoinMetadataByAddress(address: string) {
    return Moralis.EvmApi.token.getTokenMetadata({ addresses: [address] });
  }

  static getContractNFTs(address: string) {
    return Moralis.EvmApi.nft.getContractNFTs({
      address: address,
      chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
      limit: 12,
    });
  }
}

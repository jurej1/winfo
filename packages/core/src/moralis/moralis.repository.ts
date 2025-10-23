import { NftTransactions } from "@w-info-sst/types";
import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";
import { Resource } from "sst";

export class MoralisRepository {
  static getWalletHistory(address: string, chain: EvmChain, cursor?: string) {
    return Moralis.EvmApi.wallets.getWalletHistory({
      address,
      limit: 10,
      cursor,
      chain,
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

  static getWalletNetWorth(address: string) {
    return Moralis.EvmApi.wallets.getWalletNetWorth({
      address,
      chains: [Moralis.EvmUtils.EvmChain.ETHEREUM],
    });
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

  static getNftCollectionMetadata(address: string) {
    return Moralis.EvmApi.nft.getNFTContractMetadata({
      address: address,
      chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
    });
  }

  static async getNftContractTransfers(address: string) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key": Resource.MoralisAPIKey.value,
      },
    };

    const searchParams = new URLSearchParams({
      chain: "eth",
      format: "decimal",
      include_prices: "true",
      limit: "25",
      order: "DESC",
    }).toString();

    const response = await fetch(
      `https://deep-index.moralis.io/api/v2.2/nft/${address}/transfers?${searchParams}`,
      options,
    );

    const body = await response.json();

    return body as NftTransactions;
  }

  static async getNFTContractSalePrices({
    address,
    days,
  }: {
    address: string;
    days: number;
  }) {
    return Moralis.EvmApi.nft.getNFTContractSalePrices({
      address,
      days,
      chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
    });
  }

  static async getNativeBalanceByWallet(string: string) {
    return Moralis.EvmApi.balance.getNativeBalance({
      address: string,
      chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
    });
  }
}

import {
  APIResponse,
  AssetExchangeRecordsReq,
  CoinParam,
  SymbolInfo,
  SymbolLimitParam,
  SymbolParam,
  SymbolPeriodLimitParam,
  WalletFundRecordsReq,
  WithdrawRecordsReq,
} from './types/shared';
import { GenericAPIResponse } from './util/requestUtils';
import RequestWrapper from './util/requestWrapper';

export default class SharedEndpoints {
  // TODO: Is there a way to say that Base has to provide this?
  protected requestWrapper: RequestWrapper;

  /**
   *
   * Market Data Endpoints
   *
   */

  getOrderBook(params: SymbolParam): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/public/orderBook/L2', params);
  }

  /**
   * Get latest information for symbol
   */
  getTickers(params?: Partial<SymbolParam>): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/public/tickers', params);
  }

  getSymbols(): Promise<APIResponse<SymbolInfo[]>> {
    return this.requestWrapper.get('v2/public/symbols');
  }

  /**
   *
   * Market Data : Advanced
   *
   */

  getOpenInterest(params: SymbolPeriodLimitParam): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/public/open-interest', params);
  }

  getLatestBigDeal(params: SymbolLimitParam): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/public/big-deal', params);
  }

  getLongShortRatio(params: SymbolPeriodLimitParam): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/public/account-ratio', params);
  }

  /**
   *
   * Account Data Endpoints
   *
   */

  getApiKeyInfo(): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/private/account/api-key');
  }

  /**
   *
   * Wallet Data Endpoints
   *
   */

  getWalletBalance(params?: Partial<CoinParam>): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/private/wallet/balance', params);
  }

  getWalletFundRecords(params?: WalletFundRecordsReq): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/private/wallet/fund/records', params);
  }

  getWithdrawRecords(params: WithdrawRecordsReq): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/private/wallet/withdraw/list', params);
  }

  getAssetExchangeRecords(params?: AssetExchangeRecordsReq): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/private/exchange-order/list', params);
  }

  /**
   *
   * API Data Endpoints
   *
   */

  getServerTime(): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/public/time');
  }

  getApiAnnouncements(): GenericAPIResponse<any> {
    return this.requestWrapper.get('v2/public/announcement');
  }

  async getTimeOffset(): Promise<number> {
    const start = Date.now();
    return this.getServerTime().then(result => {
      const end = Date.now();
      return Math.ceil((result.time_now * 1000) - end + ((end - start) / 2));
    });
  }
}

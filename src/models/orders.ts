import { Maybe } from './product';

type IApr = {
  lid: number;
  lpatcod: Maybe<string>;
  aprcode: Maybe<string>;
  apranun: Maybe<string>;
  miavor: Maybe<string>;
  psize: Maybe<number>;
  marka: Maybe<string>;
  qanak: Maybe<number>;
  gin: Maybe<number>;
  zgin: Maybe<number>;
  gumar: Maybe<number>;
  zexch: Maybe<number>;
  zhimq: Maybe<string>;
};

export interface IOldOrder {
  id: number;
  men: Maybe<number>;
  sdate: Maybe<string>;
  patcod: Maybe<string>;
  gycod: Maybe<number>;
  gyanun: Maybe<string>;
  spdit: Maybe<string>;
  sgumar: Maybe<number>;
  szgumar: Maybe<number>;
  pahest: Maybe<number>;
  aah: Maybe<string>;
  pstatus: Maybe<number>;
  hexinak: Maybe<string>;
  ttiv: Maybe<number>;
  apr_cank: Maybe<Array<IApr>>;
}

export type IOldOrderListItem = Pick<
  IOldOrder,
  'id' | 'gyanun' | 'gycod' | 'sdate' | 'patcod' | 'spdit'
>;

export interface IDebt {
  flSN: Maybe<string>;
  fCODE: Maybe<string>;
  men: Maybe<string>;
  anun: Maybe<string>;
  hacse: Maybe<string>;
  arhasce: Maybe<string>;
  aktrg: Maybe<string>;
  plist: Maybe<string>;
  hsrg: Maybe<string>;
  partq: Maybe<string>;
  zexch: Maybe<string>;
}
export type IDebtListItem = Pick<IDebt, 'flSN'>;

export interface SendOrderListFetchedData {
  men?: string;
  id: number;
  sdate: Date;
  gycod: string;
  aah: string;
  spdit?: string;
  apr_cank: Array<{ aprcod: string; lid: number; qanak: number; marka: string }>;
}

export type OrderItemType = 'Այո' | 'Ոչ' | 'Ց4' | 'Ց5';

export interface RemoveBasketItemFetchedData {
  id: number;
  sdate: Date;
  gycod: string;
  aah: string;
  apr_cank: Array<{ lid: number }>;
}

export interface UpdateBasketFetchedData {
  id: number;
  men?: string;
  aah: string;
  spdit?: string;
}

export type DeleteOrderFetchedData = Pick<SendOrderListFetchedData, 'id' | 'aah'>;

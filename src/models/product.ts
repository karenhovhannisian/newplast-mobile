export type Maybe<T> = T | null;

export interface IProduct {
  categories_id: string;
  categories_name: string;
  products_id: string;
  products_image: string;
  pxumb_name: string;
  sizes: string;
}

export interface IProductType {
  apqk: string;
  cank: string;
  p1: string;
  p2: string;
  typ: string;
}

export interface IProductDetails {
  chdzmnac: Maybe<string>;
  fCODE: Maybe<string>;
  fNAME: Maybe<string>;
  fSTORAGE: Maybe<string>;
  gin: Maybe<string>;
  marka: Maybe<string>;
  miavor: Maybe<string>;
  mnacord: Maybe<string>;
  products_id: string;
  psize: Maybe<string>;
  pxumb_name: Maybe<string>;
  size_id: string;
  zexch: Maybe<string>;
}

export type IProductInfo = Record<string, Array<IProductDetails>>;

export type IFilterItem = Pick<IProduct, 'categories_id' | 'categories_name'>;

export type IGetProductInfoReqData = {
  value: string;
  id: string;
};

export interface IBasketProduct {
  lid: number;
  lpatcod: Maybe<string>;
  aprcod: Maybe<number>;
  apranun: Maybe<string>;
  miavor: Maybe<string>;
  psize: Maybe<string>;
  marka: Maybe<string>;
  qanak: Maybe<number>;
  gin: Maybe<number>;
  zgin: Maybe<number>;
  gumar: Maybe<number>;
  zexch: Maybe<number>;
  zhimq: Maybe<string>;
  products_id?: string;
}
export interface IBasketItem {
  id: number;
  men: number;
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
  pstatan: Maybe<string>;
  apr_cank: Array<IBasketProduct>;
}

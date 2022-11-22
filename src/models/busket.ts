import { Maybe } from './product';

export type IManager = {
  codn: string;
  men: string;
  vm: string;
};

export type ICustomer = {
  aktrg: Maybe<string>;
  anun: Maybe<string>;
  arhasce: Maybe<string>;
  fCODE: Maybe<string>;
  fISN: Maybe<string>;
  hacse: Maybe<string>;
  hsrg: Maybe<string>;
  men: Maybe<string>;
  partq: Maybe<string>;
  plist: Maybe<string>;
  zexch: Maybe<string>;
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DeleteOrderFetchedData,
  RemoveBasketItemFetchedData,
  SendOrderListFetchedData,
  UpdateBasketFetchedData,
} from '../models/orders';
import { IBasketItem } from '../models/product';
import { configs } from '../utils/constants';

export default class APIServices {
  static getCredentials() {
    return new Promise(
      async (resolve, reject) =>
        await AsyncStorage.getItem('persist:root')
          .then(data => {
            if (data) {
              const auth = JSON.parse(JSON.parse(data).auth);
              resolve({ username: auth.username, password: auth.password });
            }
          })
          .catch(err => reject(err)),
    );
  }

  static async logIn(data: FormData) {
    return fetch(configs.apiUrl, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
  }

  static async getProducts(): Promise<any> {
    return this.getCredentials().then((credentials: any) => {
      const body = new FormData();
      body.append('sl', `j,${credentials.username},${credentials.password},mxumb`);

      return fetch(configs.apiUrl, {
        body: body,
        method: 'POST',
        credentials: 'include',
      });
    });
  }

  static async getProductsType(): Promise<any> {
    return this.getCredentials().then((credentials: any) => {
      const body = new FormData();
      body.append('sl', `j,${credentials.username},${credentials.password},ptype`);

      return fetch(configs.apiUrl, {
        body: body,
        method: 'POST',
        credentials: 'include',
      });
    });
  }

  static async getProductsInfo(customerId: string, value: string, id: string): Promise<any> {
    return this.getCredentials().then((credentials: any) => {
      const queryString = `?sl=j,${credentials.username},${credentials.password},apr_mnacs, where psize=N'${value}' and products_id=${id}&gc=${customerId}`;

      return fetch(configs.apiUrl + queryString, {
        method: 'POST',
        credentials: 'include',
      });
    });
  }

  static async getOldOrders() {
    return this.getCredentials().then((credentials: any) => {
      const body = new FormData();
      body.append('sl', `j,${credentials.username},${credentials.password},patvera,where l.id>0`);

      return fetch(configs.apiUrl, {
        method: 'POST',
        body: body,
        credentials: 'include',
      });
    });
  }

  static async getDebtList() {
    return this.getCredentials().then((credentials: any) => {
      const body = new FormData();
      body.append('sl', `j,${credentials.username},${credentials.password},gynker`);

      return fetch(configs.apiUrl, {
        method: 'POST',
        body: body,
        credentials: 'include',
      });
    });
  }

  static async getManagerList() {
    return this.getCredentials().then((credentials: any) => {
      const body = new FormData();
      body.append('sl', `j,${credentials.username},${credentials.password},mens`);

      return fetch(configs.apiUrl, {
        method: 'POST',
        body: body,
        credentials: 'include',
      });
    });
  }
  static async getCustomerList() {
    return this.getCredentials().then((credentials: any) => {
      const body = new FormData();
      body.append('sl', `j,${credentials.username},${credentials.password},gynker`);

      return fetch(configs.apiUrl, {
        method: 'POST',
        body: body,
        credentials: 'include',
      });
    });
  }
  static async sendOrderList(
    data: Array<
      | SendOrderListFetchedData
      | RemoveBasketItemFetchedData
      | UpdateBasketFetchedData
      | DeleteOrderFetchedData
    >,
  ): Promise<Array<IBasketItem>> {
    return this.getCredentials().then((credentials: any) => {
      const body = new FormData();
      body.append('sl', `j,${credentials.username},${credentials.password},save`);
      body.append('data', JSON.stringify(data));

      return fetch(configs.apiUrl, {
        method: 'POST',
        body: body,
        credentials: 'include',
      })
        .then(res => res.json())
        .catch(err => console.log(err));
    });
  }
  static async confirmOrder(data: string) {
    return this.getCredentials().then((credentials: any) => {
      const body = new FormData();
      body.append('sl', `j,${credentials.username},${credentials.password},sev`);
      body.append('pc', data);

      return fetch(configs.apiUrl, {
        method: 'POST',
        body: body,
        credentials: 'include',
      })
        .then(res => res.json())
        .catch(err => console.log(err));
    });
  }
}

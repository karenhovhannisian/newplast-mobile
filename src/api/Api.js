import axios from 'axios';
import constants from '../configs/contsants';
import cache from '../Common/Cache';

export default class NewPlastApi {
  static createLogin() {
    return axios(`${constants.apiUrl}/`);
  }

  static getPrice(productId, size) {
    return axios.post(
      `http://109.75.42.220/service.php?sl=j,WKaren,wkaren,apr_sgin, where psize=${size} and p.products_id=${productId}`,
    );
  }

  static getOldOrders() {
    return NewPlastApi.getCredentials().then(credentials => {
      const bodyFormData = new FormData();
      bodyFormData.append(
        'sl',
        `j,${credentials.user},${credentials.pass},patvera,where l.id>0`,
      );

      const options = {
        method: 'POST',
        url: `${constants.apiUrl}`,
        credentials: 'include',
        data: bodyFormData,
      };

      return axios(options);
    });
  }

  static getProducts() {
    return NewPlastApi.getCredentials().then(credentials => {
      const bodyFormData = new FormData();
      bodyFormData.append(
        'sl',
        `j,${credentials.user},${credentials.pass},mxumb`,
      );

      const options = {
        method: 'POST',
        url: `${constants.apiUrl}`,
        credentials: 'include',
        data: bodyFormData,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return axios(options);
    });
  }

  static getCredentials() {
    return new Promise((resolve, reject) => {
      let result = {};
      cache.getItem('user', function(err, value) {
        if (err) {
          reject(err);
        }
        result.user = value;
        cache.getItem('login', function(err1, value1) {
          if (err1) {
            reject(err1);
          }
          result.pass = value1;
          resolve(result);
        });
      });
    });
  }
}

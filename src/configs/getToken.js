import cache from '../Common/Cache';

const getToken = new Promise((res, rej) => {
  const defaultState = {
    pass: null,
    user: null,
  };
  cache.getItem('user', function(err, value) {
    console.log(err);
    defaultState.user = value;
    cache.getItem('login', function(err, value) {
      console.log(err);
      defaultState.pass = value;
      res(defaultState);
      // getProducts({defaultState});
      // getProductsType();
    });
  });
});

export default getToken;

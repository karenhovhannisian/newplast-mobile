import { IFilterItem, IProduct } from '../models/product';

export const divideArrayToChunks = <T>(array: Array<T>, perChunk: number) => {
  const newArray = [];
  for (let i = 0; i < array.length; i += perChunk) {
    newArray.push(array.slice(i, i + perChunk));
  }
  return newArray;
};

export const getProductsTypes = (products: Array<IProduct>) =>
  products.reduce<Array<IFilterItem>>((acc, curr) => {
    const itemIndex = acc.findIndex(val => val.categories_id === curr.categories_id);
    if (itemIndex === -1) {
      return [...acc, { categories_id: curr.categories_id, categories_name: curr.categories_name }];
    }
    return acc;
  }, []);

export const groupBy = <T>(list: Array<T>, keyGetter: (i: T) => string) => {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const getDate = (date: Date) => {
  const day = padTo2Digits(date.getDate());
  const month = padTo2Digits(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear() % 100;

  return `${day}/${month}/${year}`;
};

export const isDateFromRange = (date: number, endDate: number, startDate?: number) => {
  if (!startDate && date <= endDate) {
    return true;
  } else if (startDate && date <= endDate && date >= startDate) {
    return true;
  } else {
    return false;
  }
};

export function limitOffset<T>(array: Array<T>, limit: number, offset: number): Array<T> {
  if (!array) {
    return [];
  }

  const length = array.length;

  if (!length) {
    return [];
  }
  if (offset > length - 1) {
    return [];
  }

  const start = Math.min(length - 1, offset);
  const end = Math.min(length, offset + limit);

  return array.slice(start, end);
}

import { Dimensions } from 'react-native';
import { OrderItemType } from '../models/orders';

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('screen');

export const configs = {
  apiUrl: 'http://109.75.42.220/service.php',
};

export const ERROR_STANDARD_MESSAGE = 'Ստուգեք ինտերնետի առկայությունը կամ փորձեք մի փոքր ուշ։';

export const INITIAL_ITEMS_PER_PAGE = 30;
export const ITEMS_PER_PAGE = 30;

export const oldOrdersTableColumns = [
  '',
  'Հաճախորդի անուն',
  'Կոդ',
  'Պատվերի ստեղծման օր',
  'Պատվերի կոդ',
  '',
];
export const orderHistoryTableColumns = ['', 'Պատվերի անուն', 'Չափս', 'Քանակ', 'Գին'];
export const debtsTableColumns = ['', 'Հաճախորդի անուն', 'Հասցե', 'Կոդ', 'Զեղչ', 'Պարտք'];
export const orderTableColumns = ['', 'Հաճախորդի անուն', 'Ստեղծման ամսաթիվ', 'Գումարը', ''];
export const basketTabs: Array<{ id: number; title: OrderItemType }> = [
  {
    id: 0,
    title: 'Այո',
  },
  {
    id: 1,
    title: 'Ոչ',
  },
  {
    id: 2,
    title: 'Ց4',
  },
  {
    id: 3,
    title: 'Ց5',
  },
];

export const colors = {};

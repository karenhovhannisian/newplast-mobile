import React, {useEffect, useState} from 'react';
import {View, Picker, ActivityIndicator, TextInput, Text} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import ScrollableTab from '../ScrollableTab';
import {
  getCustomerList,
  getManagerList,
  sendOrderList,
} from '../../redux/actions';
import {SearchBar} from 'react-native-elements';

const Basket = ({
  selectedProducts,
  managerList,
  getManagerList,
  sendOrderList,
  getCustomerList,
  customerList,
}) => {
  useEffect(() => {
    getManagerList();
    getCustomerList();
  }, []);

  const defaultSelectedManager =
    Array.isArray(managerList) &&
    managerList.map(man => {
      return man.codn;
    });
  const groupBy = (list, keyGetter) => {
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

  const pets = customerList ? customerList : [];
  const grouped = groupBy(pets, pet => pet.aktrg.trim());
  const keys = [...grouped.keys()];

  const [selectedManager, setSelectedManager] = useState(
    defaultSelectedManager ? defaultSelectedManager[0] : '',
  );
  const [selectedCustomers, setSelectedCustomers] = useState(keys[0]);
  const [selectedCustomersName, setSelectedCustomersName] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const grouped = groupBy(pets, pet => pet.aktrg.trim());
    setSelectedCustomersName(grouped.get(selectedCustomers));
  }, [selectedCustomers]);

  const filterSelectedCustomersName =
    selectedCustomersName &&
    selectedCustomersName.filter(l =>
      l.anun
        .trim()
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  const tabs = [
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

  const filteredTabs = [];

  tabs.forEach(tab => {
    if (
      selectedProducts &&
      selectedProducts.map(e => e.type).includes(tab.title)
    ) {
      filteredTabs.push(tab);
    }
  });
  const filterOrderList = filteredTabs.map(tab => {
    return selectedProducts.filter(p => p.type === tab.title);
  });

  const sendOrderData = itemValue => {
    setCustomerName(itemValue);
    let data = [
      filterOrderList.map(el => {
        return {
          men: selectedManager,
          id: 0,
          sdate: new Date(),
          gycod: itemValue ? itemValue.trim() : '',
          aah: el[0].type,
          apr_cank:
            el &&
            el.map(e => {
              return {
                aprcod: e.aprcod,
                lid: e.lid,
                qanak: e.qanak,
                marka: e.marka,
              };
            }),
        };
      }),
    ];
    setData(data);
    sendOrderList(data);
  };

  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <>
      {selectedProducts.length ? (
        <View style={styles.header}>
          <View style={styles.pickerView1}>
            <Picker
              selectedValue={selectedManager}
              style={{color: '#0A3695'}}
              itemStyle={{fontSize: 30, width: 20, height: 20, color: 'green'}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedManager(itemValue)
              }>
              {/*<Picker.Item key={'unselectable'} label='Մենեջեր' value={0} />*/}
              {Array.isArray(managerList) &&
                managerList.map(man => {
                  return (
                    <Picker.Item
                      color={'#0A3695'}
                      label={man.men}
                      value={man.codn}
                    />
                  );
                })}
            </Picker>
          </View>
          <View style={styles.pickerView2}>
            {!keys ? (
              <View style={[styles.containers, styles.horizontal]}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ) : (
              <Picker
                mode={'dropdown'}
                selectedValue={selectedCustomers}
                style={{color: '#0A3695'}}
                itemStyle={{fontSize: 30, color: 'red'}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCustomers(itemValue)
                }>
                {keys &&
                  keys.map(key => {
                    return (
                      <Picker.Item color={'#0A3695'} label={key} value={key} />
                    );
                  })}
              </Picker>
            )}
          </View>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={customerName}
              style={{color: '#0A3695', fontSize: 40}}
              itemStyle={styles.pickerItemStyle}
              onValueChange={(itemValue, itemIndex) =>
                sendOrderData(itemValue)
              }>
              <Picker.Item key={'unselectable'} label="Հաճախորդ" value={0} />

              {filterSelectedCustomersName &&
                filterSelectedCustomersName.map(cus => {
                  return (
                    <Picker.Item
                      color={'#0A3695'}
                      label={cus.anun}
                      value={cus.fCODE}
                    />
                  );
                })}
            </Picker>
          </View>
          <View style={styles.pickerView22}>
            <SearchBar
              containerStyle={{
                width: '100%',
                borderRadius: 10,
                height: 50,
              }}
              platform="android"
              onChangeText={updateSearch}
              value={search}
              showCancel={true}
              clearIcon={true}
              cancelIcon={true}
            />
          </View>
        </View>
      ) : null}
      <ScrollableTab
        data={data}
        filteredTabs={filteredTabs}
        customerName={customerName}
        selectedManager={selectedManager}
        selectedProducts={selectedProducts}
      />
    </>
  );
};

const mapStateToProps = state => ({
  selectedProducts: state.ProductsReducer.selectedProducts,
  managerList: state.BasketReducer.managerList,
  customerList: state.BasketReducer.customerList,
});

const mapDispatchToProps = dispatch => ({
  getManagerList: () => dispatch(getManagerList()),
  getCustomerList: () => dispatch(getCustomerList()),
  sendOrderList: data => dispatch(sendOrderList(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Basket);

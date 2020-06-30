import React, {useState} from 'react';
import {Image, TouchableOpacity, View, Text, Dimensions} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {getDebtList, getOldOrders, getProducts} from '../../redux/actions';

const Footer = ({
  navigate,
  navigates,
  getDebtList,
  getOldOrders,
  getProducts,
}) => {
  const [itemWidth, setItemWidth] = useState(Dimensions.get('window').width);
  const onLayout = () => {
    setItemWidth(Dimensions.get('window').width);
  };

  return (
    <View
      style={itemWidth < 811 ? styles.container : styles.containers}
      onLayout={onLayout}>
      <TouchableOpacity
        onPress={() => {
          getOldOrders();
          navigate('Order');
        }}
        style={{
          width: 250,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Image source={require('./images/2.png')} />
        <Text style={{color: 'white', fontSize: 18, marginLeft: '3%'}}>
          Նախկին պատվերներ
        </Text>
        {navigates.state.routeName === 'Order' ? (
          <Image
            style={{position: 'absolute', top: 47}}
            source={require('./images/16.png')}
          />
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          getProducts();
          navigate('orderCreate');
        }}
        style={{
          width: 180,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginLeft: '10%',
        }}>
        <Image source={require('./images/3.png')} />
        <Text style={{color: 'white', fontSize: 18, marginLeft: '3%'}}>
          Ստեղծել պատվեր
        </Text>
        {navigates.state.routeName === 'orderCreate' ? (
          <Image
            style={{position: 'absolute', top: 47}}
            source={require('./images/16.png')}
          />
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          getDebtList();
          navigate('Debt');
        }}
        style={{
          width: 180,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginLeft: '10%',
        }}>
        <Image source={require('./images/1.png')} />
        <Text style={{color: 'white', fontSize: 18, marginLeft: '3%'}}>
          Պարտք
        </Text>
        {navigates.state.routeName === 'Debt' ? (
          <Image
            style={{position: 'absolute', top: 47, right: '20%'}}
            source={require('./images/16.png')}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  getProducts: data => dispatch(getProducts(data)),
  getOldOrders: () => dispatch(getOldOrders()),
  getDebtList: data => dispatch(getDebtList(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);

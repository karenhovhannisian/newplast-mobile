import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {clearOrderData, clearSelectedProduct} from '../../redux/actions';

const CreateOrderSuccessModal = props => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./images/1.png')} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Home');
            props.clearSelectedProduct();
            props.clearOrderData();
          }}
          style={styles.content}>
          <Image style={styles.imgStyle} source={require('./images/2.png')} />
          <Text style={styles.textStyle}>Վերադառնալ Գլխավոր էջ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  clearSelectedProduct: () => dispatch(clearSelectedProduct()),
  clearOrderData: () => dispatch(clearOrderData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(CreateOrderSuccessModal));

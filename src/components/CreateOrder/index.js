import React from 'react';
import {ImageBackground, View} from 'react-native';
import Products2 from '../ProductsNew';
import Footer from '../Footer';

const createOrder = props => {
  const {navigate} = props.navigation;
  return (
    <View>
      <ImageBackground
        source={require('./images/111.png')}
        style={{width: '100%', height: '80%', position: 'absolute'}}
      />
      <View>
        <Products2 />
        <View>
          <Footer navigates={props.navigation} navigate={navigate} />
        </View>
      </View>
    </View>
  );
};

export default createOrder;

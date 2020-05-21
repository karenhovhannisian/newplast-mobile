import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  View,
  Modal,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import ProductItem from '../Products/ProductItem';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Loader from 'react-native-mask-loader/lib';
import {Badge, SearchBar} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import cache from '../../Common/Cache';

const Products2 = ({products, selectedProducts}) => {
  const spinValue = new Animated.Value(0);

  const carousel = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(
    Dimensions.get('window').width,
  );
  const [search, setSearch] = useState('');
  const [perm, setPerm] = useState(null);

  const filterProductList =
    products &&
    products.filter(l =>
      l.pxumb_name
        .trim()
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const updateSearch = search => {
    setSearch(search);
    setCurrentIndex(0);
  };

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 50,
      easing: Easing.elastic(2),
      duration: 600,
    }).start();
  }, [currentIndex]);

  useEffect(() => {
    cache.getItem('perm', function(err, value) {
      setPerm(value);
    });
  }, []);

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 50,
      easing: Easing.elastic(2),
      duration: 600,
    }).start();
  });

  const interpolatedRotateAnimation = spinValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 0, 0],
  });

  if (!products || !products.length) {
    return <Loader />;
  }
  if (!filterProductList.length) {
    return (
      <View style={{width: '100%', height: '91%'}}>
        <SearchBar
          containerStyle={{
            width: '20%',
            borderRadius: 35,
            height: 50,
            backgroundColor: '#f2f2f2',
            top: -53,
            right: 180,
            position: 'absolute',
            elevation: 5524,
          }}
          platform="android"
          onChangeText={updateSearch}
          value={search}
          showCancel={true}
          clearIcon={true}
          cancelIcon={true}
        />
      </View>
    );
  }

  const searchPermission = perm && perm.includes('find');
  const addProductPermission = perm && perm.includes('dit');

  return (
    <>
      <GestureRecognizer
        onSwipe={() => console.log('onSwipeUp')}
        onSwipeUp={() => console.log('onSwipeUp')}
        onSwipeDown={() => console.log('onSwipeDown')}
        onSwipeLeft={() =>
          currentIndex < filterProductList.length - 1 &&
          setCurrentIndex(currentIndex + 1)
        }
        onSwipeRight={() => currentIndex && setCurrentIndex(currentIndex - 1)}
        config={config}
        style={
          sliderWidth < 800
            ? {
                width: '100%',
                height: responsiveHeight(81),
              }
            : {}
        }>
        <Badge
          value={selectedProducts.length}
          status="error"
          containerStyle={{
            position: 'absolute',
            top: -50,
            right: 70,
            elevation: 24,
          }}
        />
        <TouchableOpacity
          style={{position: 'absolute', top: '35%', left: 12, elevation: 50}}
          onPress={() => currentIndex && setCurrentIndex(currentIndex - 1)}>
          <Image source={require('./images/left.png')} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Animated.View
            style={{
              transform: [
                {translateX: spinValue},
                {rotate: interpolatedRotateAnimation},
              ],
            }}>
            {filterProductList[currentIndex] && (
              <ProductItem
                currentIndex={currentIndex}
                addProductPermission={addProductPermission}
                product={{
                  item: filterProductList && filterProductList[currentIndex],
                  index: currentIndex,
                }}
              />
            )}
          </Animated.View>
        </View>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <TouchableHighlight
            style={styles.modalVisibleClose}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Image
              style={{width: 25, height: 25}}
              source={require('./images/close.png')}
            />
          </TouchableHighlight>
        </Modal>
        <TouchableOpacity
          style={{position: 'absolute', top: '35%', right: 12, elevation: 24}}
          onPress={() =>
            currentIndex < filterProductList.length - 1 &&
            setCurrentIndex(currentIndex + 1)
          }>
          <Image source={require('./images/right.png')} />
        </TouchableOpacity>
      </GestureRecognizer>
      {searchPermission ? (
        <SearchBar
          containerStyle={{
            width: '20%',
            borderRadius: 35,
            height: 50,
            backgroundColor: '#f2f2f2',
            top: -53,
            right: 180,
            position: 'absolute',
            elevation: 5524,
          }}
          platform="android"
          onChangeText={updateSearch}
          value={search}
          showCancel={true}
          clearIcon={true}
          cancelIcon={true}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = state => ({
  products: state.ProductsReducer.products,
  selectedProducts: state.ProductsReducer.selectedProducts,
});

export default connect(mapStateToProps)(Products2);

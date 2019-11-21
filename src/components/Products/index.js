import React, {useEffect, useState} from 'react';
import {Text, Image, View, Modal, TouchableHighlight, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {normalize} from '../../Common/metrics';
import {Dropdown} from 'react-native-material-dropdown';
import Filters from "../Filters";
import styles from "./styles";
import {adProducts, getBalance, getPrice, getProducts} from "../../redux/actions";
import {connect} from "react-redux";
import Stepper from "../Stepper";
import ProductsCheckBox from "../CheckBox";

const Products = ({getProducts, products, getBalance, balance, adProducts, selectedProducts, getPrice, price}) => {


    useEffect(() => {
        getBalance()
    }, []);
    useEffect(() => {
        setPrices(price)
    }, [price]);


    const onLayout = (e) => {
        // setSliderWidth(Dimensions.get('window').width - 300);
        // setItemWidth(Dimensions.get('window').width - 400);
    };
    const [activeTypeIndex, setActiveTypeIndex] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [count, setCount] = useState(0);
    const [prices, setPrices] = useState(price ? price : null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState(null);
    const [sizesValue, setSizesValue] = useState('');
    const [sliderWidth, setSliderWidth] = useState(Dimensions.get('window').width - 150);
    const [sliderItemWidth, setItemWidth] = useState(Dimensions.get('window').width -150);

    const getImageSource = (id) => {
        let imageUrl = null;
        switch (id) {
            case 0:
                imageUrl = require('./images/PEGFPE.jpg');
                break;
            case 1:
                imageUrl = require('./images/www.jpg');
                break;
            case 2:
                imageUrl = require('./images/PPRALPEX.jpg');
                break;
            case 3:
                imageUrl = require('./images/PPRC.jpg');
                break;
            case 4:
                imageUrl = require('./images/PPRGFPPR.jpg');
                break;
            default:
                imageUrl = require('./images/www.jpg');
        }
        return imageUrl;
    };

    const onChangeCount = (value) => {
        setCount(value)
    };

    const onChangeCurrentIndex = (slideIndex) => {
        setCurrentIndex(slideIndex)
        setPrices(null)
        setCount(0)
        setSizesValue('')
    };
    const product =
        {
            name: productName,
            id: productId,
            count: count,
            size: sizesValue,
            type: activeTypeIndex
        };

    const onChangeSize = (value) => {
        setSizesValue(value);
        getPrice(value, products[currentIndex].products_id);
        setProductName(products[currentIndex].pxumb_name.trim());
        setProductId(products[currentIndex].products_id)
    };

    const adProduct = () => {
        adProducts(product);
    };


    const renderItem = (product, index) => {

        let data = product.item.sizes.split(',').map(label => ({label, value: label}));
        let icon = getImageSource(product.index);

        return (
            <View style={styles.renderItemContainer}>
                <Image style={{width: normalize(100), height: 300, marginTop: 100, marginRight: 40}}
                       source={icon}
                />

                <View style={styles.renderItemContent}>
                    <View style={styles.productsNameContainer}>
                        <Text style={styles.productsName}>
                            {product.item.pxumb_name ? product.item.pxumb_name.trim() : ""}
                        </Text>
                        <Text style={styles.chooseSize}>
                            Ընտրեք չափսը
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                            <Dropdown
                                pickerStyle={{borderBottomColor:'transparent',borderWidth: 0}}
                                fontSize={22}
                                containerStyle={{width: 120}}
                                data={data}
                                value={sizesValue}
                                onChangeText={(value) => onChangeSize(value)}
                                textColor={'#072C7D'}
                                rippleCentered={true}
                            />
                        </View>
                        {/*{*/}
                        {/*     balance && balance.map((mn) => {*/}
                        {/*        return <View style={{width: 200}}>*/}
                        {/*            <Text style={styles.balanceText}>Մնացորդ՝ {mn.mnacord} Մ </Text>*/}
                        {/*            <Text style={styles.balanceText}> Չձևակերպված մնացորդ՝ </Text>*/}
                        {/*        </View>*/}
                        {/*    } )*/}
                        {/*}*/}

                        <View style={{width: 300, marginBottom:10}}>
                            <Text style={styles.balanceText}>Մնացորդ՝ </Text>
                            <Text style={styles.balanceText}>Չձևակերպված մնացորդ՝ </Text>
                        </View>
                        {prices ? <View style={styles.costCount}>
                            <Text style={styles.costCountText}> {prices ? prices.split('.0000') : null} դրամ </Text>
                        </View> : null}
                        <Stepper onChangeCount={(value) => onChangeCount(value)}/>

                        <ProductsCheckBox activeTypeIndex={activeTypeIndex} setActiveTypeIndex={setActiveTypeIndex}/>


                    </View>


                    <View style={styles.costContainer}>
                        {/*{prices ? <Text style={styles.costText}>Գինը՝</Text> : <Text></Text>}*/}

                        <TouchableHighlight onPress={adProduct}
                                            style={count !== 0 && sizesValue ? styles.addToCartButton : styles.addToCartButtonOp}>
                            <Text onPress={adProduct} style={styles.addToCartText}>
                                Ավելացնել զամբյուղ
                                <Image onPress={adProduct}
                                       style={styles.addToCartImg}
                                       source={require("./images/shoping.png")}/>
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </View>
        )
    };

    return (
        <View>
            <View style={styles.container}>
                <Image style={styles.containerC4Image}
                       source={require("./images/c4.png")}/>


                    <Carousel
                        onLayout={onLayout}
                        data={products ? products : []}
                        sliderWidth={sliderWidth}
                        itemWidth={sliderItemWidth}
                        renderItem={(product, index) => renderItem(product, index)}
                        containerWidth={500}
                        separatorWidth={0}
                        minScrollDistance={1}
                        pagingEnable={true}
                        onSnapToItem={(slideIndex) => onChangeCurrentIndex(slideIndex)}
                    />
                <TouchableHighlight onPress={() => {
                    setModalVisible(!modalVisible)
                }}
                                    style={styles.modalVisible}>
                    <Image
                        style={{width: 80, height: 80}}
                        source={require("./images/filter.png")}/>
                </TouchableHighlight>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <Filters/>
                <TouchableHighlight
                    style={styles.modalVisibleClose}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Image style={{width: 25, height: 25}}
                           source={require("./images/close.png")}/>
                </TouchableHighlight>
            </Modal>
        </View>

    );

};

const mapStateToProps = (state) => ({
    products: state.ProductsReducer.products,
    balance: state.ProductsReducer.balance,
    selectedProducts: state.ProductsReducer.selectedProducts,
    price: state.ProductsReducer.price,
});

const mapDispatchToProps = (dispatch) => ({
    // getProducts: () => dispatch(getProducts()),
    getPrice: (value, productId) => dispatch(getPrice(value, productId)),
    getBalance: () => dispatch(getBalance()),
    adProducts: (product) => dispatch(adProducts(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Products)

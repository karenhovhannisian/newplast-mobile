import React, {useEffect, useState, useRef} from 'react';
import {Text, Image, View, TouchableHighlight, Modal, TouchableOpacity, Dimensions} from 'react-native';
import {normalize} from '../../Common/metrics';
import {Dropdown} from 'react-native-material-dropdown';
import styles from "./styles";
import Stepper from "../Stepper";
import ProductsCheckBox from "../CheckBox";
import {adProducts, getPrice} from "../../redux/actions";
import {connect} from "react-redux";
import ImageViewer from 'react-native-image-zoom-viewer';


const ProductItem = ({product, addProductToBasket, price, getPrice, currentIndex }) => {

    useEffect(() => {
        setPrices(price)
    }, [price]);
    useEffect(() => {
        setIndex(currentIndex);
        setActiveTypeIndex(null);
        setCount(0);
        changeProductSize('');
        setPrices(null)
    }, [currentIndex]);

    const [activeTypeIndex, setActiveTypeIndex] = useState(null);
    const [index, setIndex] = useState(null);
    const [productSize, changeProductSize] = useState('');
    const [count, setCount] = useState(null);
    const [prices, setPrices] = useState(price ? price : null);
    const [imageZoom, setImageZoom] = useState(false);
    const [itemWidth, setItemWidth] = useState(Dimensions.get('window').width);

    const onChangeSize = (value) => {
        changeProductSize(value);
        getPrice(value, product.item.products_id);
    };
  const onLayout = () => {
      setItemWidth( Dimensions.get('window').width)
    };

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

    const openImageZoomModal = () => {
        setImageZoom(true)
    };

    const addProduct = () => {
        addProductToBasket(
            {
                name: product.item.pxumb_name ? product.item.pxumb_name.trim() : "",
                id: product.products_id,
                count: count,
                size: productSize,
                type: activeTypeIndex
            }
        );
        setCount(0);
        setPrices(null);
        setActiveTypeIndex(null);
        changeProductSize('')
    };

    let data = product.item.sizes.split(',').map(label => ({label, value: label}));
    let icon = getImageSource(product.index);

    const arr = [
        {
            width: 300,
            height: 300,
            props: {
                source: icon
            }
        },
    ];

    const canSubmit = productSize && count;
    return (<View style={styles.renderItemContainer}>
        <Modal
            visible={imageZoom}
            transparent={true}>
            <ImageViewer
                enableSwipeDown={false}
                backgroundColor='white'
                imageUrls={arr}/>
                <TouchableOpacity style={{position: 'absolute', right: 15, top:15}} onPress={() => setImageZoom(false)}>
                    <Image source={require("./images/clos.png")}/>
                </TouchableOpacity>
        </Modal>
        <Image style={styles.containerC4Image}
               source={require("./images/c4.png")}/>

        <View style={itemWidth< 810 ? styles.renderItemContent: styles.renderItemContentResponsive} onLayout={onLayout}>
            <View>
            <TouchableOpacity onPress={openImageZoomModal}>
                <Image style={{width: normalize(100), height: 300, marginTop: 100, marginRight: 40}}
                       source={icon}
                />
            </TouchableOpacity>
            </View>
            <View style={styles.productsNameContainer}>
                <Text style={styles.productsName}>
                    {product.item.pxumb_name ? product.item.pxumb_name.trim() : ""}
                </Text>
                <Text style={styles.chooseSize}>
                    Ընտրեք չափսը
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Dropdown
                        pickerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
                        fontSize={22}
                        containerStyle={{width: 120}}
                        data={data}
                        value={productSize}
                        onChangeText={(value) => onChangeSize(value)}
                        textColor={'#072C7D'}
                        rippleCentered={true}
                    />
                </View>

                <View style={{width: 300, marginBottom: 10}}>
                    <Text style={styles.balanceText}>Մնացորդ՝ </Text>
                    <Text style={styles.balanceText}>Չձևակերպված մնացորդ՝ </Text>
                </View>

                <Stepper
                    value={count}
                    onChangeCount={(value) => setCount(value)}/>
                {prices ? <View style={styles.costCount}>
                    <Text style={styles.costCountText}> {prices ? prices.split('.0000') : null} դրամ </Text>
                </View> : null}
                <ProductsCheckBox activeTypeIndex={activeTypeIndex} setActiveTypeIndex={setActiveTypeIndex}/>

                <View style={styles.costContainer}>
                    <TouchableHighlight onPress={addProduct}
                                        disabled={!canSubmit}
                                        style={canSubmit && activeTypeIndex !== null ? styles.addToCartButton : styles.addToCartButtonOp}>
                        <Text style={styles.addToCartText}>
                            Ավելացնել զամբյուղ
                            <Image
                                style={styles.addToCartImg}
                                source={require("./images/shoping.png")}/>
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>

    </View>);

};


const mapStateToProps = (state) => ({
    price: state.ProductsReducer.price,
});

const mapDispatchToProps = (dispatch) => ({
    getPrice: (value, productId) => dispatch(getPrice(value, productId)),
    addProductToBasket: (product) => dispatch(adProducts(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)

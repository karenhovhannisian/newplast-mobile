import React, {useEffect, useState} from 'react';
import {
    Text,
    Image,
    View,
    Modal,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import {normalize} from '../../Common/metrics';
import {Dropdown} from 'react-native-material-dropdown';
import styles from "../ProductsNew/styles";
import ProductsCheckBox from "../CheckBox";
import {adProducts} from "../../redux/actions";
import {connect} from "react-redux";
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from "axios";
import InputSpinner from "react-native-input-spinner";

const ProductItem = ({product, addProductToBasket, selectedProducts}) => {

    useEffect(() => {
        setProductPrice(null);
        setQuantityPrice(null);
        setMnac(null);
        setChdzmnac(null)
        changeProductSize('')
        setActiveTypeIndex(null)
        setCount(0)
    }, [product.index]);

    const [imageZoom, setImageZoom] = useState(false);
    const [loaderSizes, setLoaderSizes] = useState(false);
    const [activeTypeIndex, setActiveTypeIndex] = useState(null);
    const [productSize, changeProductSize] = useState('');
    const [count, setCount] = useState(0);
    const [productId, setProductId] = useState(null);
    const [price, setProductPrice] = useState(null);
    const [marka, setMarka] = useState(null);
    const [quantityPrice, setQuantityPrice] = useState(null);
    const [mnac, setMnac] = useState(null);
    const [chdzmnac, setChdzmnac] = useState(null);
    const [itemWidth, setItemWidth] = useState(Dimensions.get('window').width);

    const onChangeSize = (value) => {
        changeProductSize(value);
        getProductPrice(value, product.item.products_id);
        setLoaderSizes(true)
    };

    const getProductPrice = async (value, id) => {
        console.log(value, id)
        const options = {
            method: "POST",
            url: `http://109.75.42.220/service.php?sl=j,WKaren,wkaren,apr_mnacs, where psize=${value} and p.products_id=${id} and fSTORAGE='111'`,
            credentials: "include",
            headers: {
                'Content-Type': "application/json",
            }
        };
        const response = await axios.post(options.url);
        console.log(response.data, 'responseData')
        setLoaderSizes(false);
        setProductPrice(response.data[0].gin);
        setQuantityPrice(response.data[0].miavor);
        setMnac(response.data[0].mnacord);
        setChdzmnac(response.data[0].chdzmnac);
        setProductId(response.data[0].fCODE);
        setMarka(response.data[0].marka)
    };

    const onLayout = () => {
        setItemWidth(Dimensions.get('window').width)
    };

    const getImageSource = (id) => {
        let imageUrl = null;
        switch (id) {
            case 0:
                imageUrl = require('../ProductsNew/images/PEGFPE.jpg');
                break;
            case 1:
                imageUrl = require('../ProductsNew/images/www.jpg');
                break;
            case 2:
                imageUrl = require('../ProductsNew/images/PPRALPEX.jpg');
                break;
            case 3:
                imageUrl = require('../ProductsNew/images/PPRC.jpg');
                break;
            case 4:
                imageUrl = require('../ProductsNew/images/PPRGFPPR.jpg');
                break;
            default:
                imageUrl = require('../ProductsNew/images/www.jpg');
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
                aprcod: productId,
                qanak: count,
                price: price,
                marka: marka,
                psize: productSize,
                type: activeTypeIndex,
                quantityPrice: quantityPrice,
                lid: 0
            }
        );
        setProductPrice(null);
        setQuantityPrice(null);
        setMnac(null);
        setChdzmnac(null);
        changeProductSize('');
        setActiveTypeIndex(null);
        setCount(0)
    };

    let data = product && product.item && product.item.sizes.split(',').map(label => ({label, value: label}));
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

    const canSubmit = productSize && count && activeTypeIndex !== null;

    return (<View style={styles.renderItemContainer}>
        <Modal
            visible={imageZoom}
            transparent={true}>
            <ImageViewer
                enableSwipeDown={false}
                backgroundColor='white'
                imageUrls={arr}/>
            <TouchableOpacity style={{position: 'absolute', right: 15, top: 15}} onPress={() => setImageZoom(false)}>
                <Image source={require("../ProductsNew/images/Clos.png")}/>
            </TouchableOpacity>
        </Modal>
        <View style={itemWidth < 801 ? styles.renderItemContent : styles.renderItemContentResponsive}
              onLayout={onLayout}>
            <View style={{marginLeft:-70,}}>
                <TouchableOpacity onPress={openImageZoomModal}>
                    <Image style={itemWidth < 801 ? {width: normalize(100), height: 300, marginTop: 80,marginLeft:150}: {width: normalize(120), height: 320, marginTop: 80,}}
                           source={icon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.productsNameContainer}>
                <Text style={styles.productsName}>
                    {product ? product.item.pxumb_name.trim() : ''}
                </Text>
                <Text style={styles.chooseSize}>
                    Ընտրեք չափսը
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 170}}>
                    <Dropdown
                        pickerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
                        fontSize={22}
                        containerStyle={{width: 120}}
                        baseColor={'#BFBFBF'}
                        data={data}
                        value={productSize}
                        onChangeText={(value) => onChangeSize(value)}
                        textColor={'#072C7D'}
                        rippleCentered={true}
                    />
                    {loaderSizes ? <View style={{width: 10, marginTop: 45}}>
                        <ActivityIndicator size="small" color="#0000ff"/>
                    </View> : null}
                </View>

                <View style={{width: 300, marginBottom: 10}}>
                    <Text style={styles.balanceText}>Մնացորդ՝ {mnac ? mnac.split('.0000') : ''} </Text>
                    <Text style={styles.balanceText}>Չձևակերպված մնացորդ՝ {chdzmnac ? chdzmnac : ''} </Text>
                </View>
                <View style={{marginTop: 15}}>
                    <InputSpinner
                        max={9000}
                        width={170}
                        style={{borderRadius:10, borderColor: '#154CC4'}}
                        buttonStyle={{ borderColor: '#154CC4'}}
                        min={0}
                        step={1}
                        value={count}
                        rounded={false}
                        showBorder={true}
                        color={'#154CC4'}
                        textColor={'#154CC4'}
                        fontSize={22}
                        buttonFontSize={25}
                        buttonPressTextColor={'red'}
                        onChange={(num) => {
                            setCount(num);
                        }}
                    />
                </View>


                        <ProductsCheckBox activeTypeIndex={activeTypeIndex} setActiveTypeIndex={setActiveTypeIndex}/>

                <View style={styles.costContainer}>
                    <TouchableOpacity onPress={addProduct}
                                      disabled={!canSubmit}
                                      style={canSubmit ? styles.addToCartButton : styles.addToCartButtonOp}>
                        <Text style={styles.addToCartText}>
                            Ավելացնել զամբյուղ

                        </Text>
                        <Image
                            style={styles.addToCartImg}
                            source={require("../ProductsNew/images/shoping.png")}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        {price ?
        <View style={styles.costCount}>
            <Text style={styles.costCountText}> {price ? price.split('.0000') : null} <Text style={styles.costCountTexts}>դրամ</Text> </Text>
        </View>
        : null}
    </View>);

};

const mapStateToProps = (state) => ({
    selectedProducts: state.ProductsReducer.selectedProducts,
});

const mapDispatchToProps = (dispatch) => ({
    addProductToBasket: (value) => dispatch(adProducts(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)

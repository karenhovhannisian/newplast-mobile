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
import cache from "../../Common/Cache";
import constants from "../../configs/contsants";

const defaultState = {
    user: '',
    pass: ''
};

cache.getItem("user", function (err, value) {
    defaultState.user = value
});

cache.getItem("login", function (err, value) {
    defaultState.pass = value
});
const ProductItem = ({product, addProductToBasket, productsType, addProductPermission}) => {

    useEffect(() => {
        setProductPrice(null);
        setQuantityPrice(null);
        setMnac(null);
        setChdzmnac(null);
        changeProductSize('');
        setActiveTypeIndex(null);
        setCount(0);
        setGetPriceFailMessage(false)
        setLoaderSizes(false)
    }, [product.index]);

    const [imageZoom, setImageZoom] = useState(false);
    const [getPriceFailMessage, setGetPriceFailMessage] = useState(false);
    const [loaderSizes, setLoaderSizes] = useState(false);
    const [activeTypeIndex, setActiveTypeIndex] = useState(null);
    const [productSize, changeProductSize] = useState('');
    const [count, setCount] = useState(0);
    const [productId, setProductId] = useState(null);
    const [availableTypes, setAvailableTypes] = useState([]);
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

    const getAvailableTypes = (fCode) => {
        const defaultTypes = ["Այո","Ոչ"];
        productsType.forEach(type => {
            if(type.cank.includes(`${fCode}`)){
              defaultTypes.push(type.typ)
          }
        });

         return defaultTypes;
    };

    const getProductPrice = async (value, id) => {
        const bodyFormData = new FormData();
        bodyFormData.append('sl', `j,${defaultState.user},${defaultState.pass},apr_mnacs, where psize=N'${value}' and products_id=${id}`);
        const options = {
            method: "POST",
            url: `${constants.apiUrl}?sl=j,${defaultState.user},${defaultState.pass},apr_mnacs, where psize=N'${value}' and products_id=${id}`,
            credentials: "include",
            // data: bodyFormData
        };
        const response = await axios.post(options.url);
        if (response.data) {
            setGetPriceFailMessage(false);
            setLoaderSizes(false);
            setProductPrice(response.data[0].gin);
            setQuantityPrice(response.data[0].miavor);
            setMnac(response.data[0].mnacord);
            setChdzmnac(response.data[0].chdzmnac);
            setProductId(response.data[0].fCODE);
            setAvailableTypes(getAvailableTypes(response.data[0].fCODE));
            setMarka(response.data[0].marka)
        } else{
            if (response.data === "") {
                setLoaderSizes(false);
                setGetPriceFailMessage(true)
            }
        }
    };

    const onLayout = () => {
        setItemWidth(Dimensions.get('window').width)
    };

    const getImageSource = (url) => {
        const imageUrl = require('../ProductsNew/images/PEGFPE.jpg');
        return url || imageUrl
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
                lid: 0,
                imgUrl: icon
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
    let icon = getImageSource(product.item.products_image);
    const arr = [
        {
            url: icon,
            props: {
                // headers: ...
            }
        },
        {
            width: 350,
            height: 350,
            props: {
                url: icon,
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
            <View style={{marginLeft: -70,}}>
                <TouchableOpacity onPress={openImageZoomModal}>
                    <Image style={itemWidth < 801 ? {
                        width: normalize(100),
                        height: 300,
                        marginTop: 80,
                        marginLeft: 150
                    } : {width: normalize(120), height: 380, marginTop: 50,}}
                           source={{uri: icon}}
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
                    {
                        getPriceFailMessage ?  <Text style={{fontSize: 22, marginTop: 45, color: 'red'}}> Սխալ հարցում</Text> : null
                    }
                    {loaderSizes ? <View style={{width: 10, marginTop: 45}}>
                        <ActivityIndicator size="small" color="#0000ff"/>
                    </View> : null}
                </View>

                <View style={{width: 300, marginBottom: 10}}>
                    <Text style={styles.balanceText}>Մնացորդ՝ {mnac ? mnac.split('.0000') : ''} </Text>
                    <Text style={styles.balanceText}>Չձևակերպված մնացորդ՝ {chdzmnac ? chdzmnac : ''} </Text>
                </View>
                <View style={{marginTop: 15}}>
                    {!addProductPermission &&   <InputSpinner
                        max={9000}
                        width={170}
                        style={{borderRadius: 10, borderColor: '#154CC4'}}
                        buttonStyle={{borderColor: '#154CC4'}}
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
                    />}
                </View>
                {!addProductPermission && <ProductsCheckBox availableTypes={availableTypes} activeTypeIndex={activeTypeIndex} setActiveTypeIndex={setActiveTypeIndex}/>}
                <View style={styles.costContainer}>
                    {!addProductPermission && <TouchableOpacity onPress={addProduct}
                                      disabled={!canSubmit}
                                      style={canSubmit ? styles.addToCartButton : styles.addToCartButtonOp}>
                        <Text style={styles.addToCartText}>
                            Ավելացնել զամբյուղ

                        </Text>
                        <Image
                            style={styles.addToCartImg}
                            source={require("../ProductsNew/images/shoping.png")}/>
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
        {price ?
            <View style={itemWidth < 801 ? styles.costCountResponsive : styles.costCount}>
                <Text style={styles.costCountText}> {price ? price.split('.0000') : null}
                <Text style={styles.costCountTexts}>դրամ</Text> </Text>
            </View>
            : null}
    </View>);
};

const mapStateToProps = (state) => ({
    selectedProducts: state.ProductsReducer.selectedProducts,
    productsType: state.ProductsReducer.productsType,

});

const mapDispatchToProps = (dispatch) => ({
    addProductToBasket: (value) => dispatch(adProducts(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)

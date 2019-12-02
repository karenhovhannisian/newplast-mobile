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
import Stepper from "../Stepper";
import ProductsCheckBox from "../CheckBox";
import {adProducts} from "../../redux/actions";
import {connect} from "react-redux";
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from "axios";


const ProductItem = ({product, addProductToBasket, selectedProducts}) => {

    useEffect(() => {
        setProductPrice(null);
        setQuantityPrice(null);
        setMnac(null);
        setChdzmnac(null)
        changeProductSize('')
        setActiveTypeIndex(null)
        setCount(0)
    },[product.index]);


    const [imageZoom, setImageZoom] = useState(false);
    const [loaderSizes, setLoaderSizes] = useState(false);
    const [activeTypeIndex, setActiveTypeIndex] = useState(null);
    const [productSize, changeProductSize] = useState('');
    const [count, setCount] = useState(0);
    const [price, setProductPrice] = useState(null);
    const [quantityPrice, setQuantityPrice] = useState(null);
    const [mnac, setMnac] = useState(null);
    const [chdzmnac, setChdzmnac] = useState(null);
    const [itemWidth, setItemWidth] = useState(Dimensions.get('window').width);

    const onChangeSize = (value) => {
        changeProductSize(value);
        getProductPrice(value, product.item.products_id);
        setLoaderSizes(true)
    };

    const  getProductPrice = async (value, id) => {
        const options = {
            method: "POST",
            url: `http://109.75.42.220/service.php?sl=j,WKaren,wkaren,apr_mnacs, where psize=${value} and p.products_id=${id}`,
            credentials: "include",
            headers:{
                'Content-Type': "application/json",
            }
        };
        const response = await axios.post(options.url);
        setLoaderSizes(false)
        setProductPrice(response.data[0].gin);
        setQuantityPrice(response.data[0].miavor);
        setMnac(response.data[0].mnacord);
        setChdzmnac(response.data[0].chdzmnac)
    };

    const onLayout = () => {
      setItemWidth( Dimensions.get('window').width)
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
                id: product.item.products_id ? product.item.products_id : '',
                count: count,
                price: price,
                size: productSize,
                type: activeTypeIndex,
                quantityPrice: quantityPrice
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

    const canSubmit = productSize && count && activeTypeIndex !==null ;

    return (<View style={styles.renderItemContainer}>
        <Modal
            visible={imageZoom}
            transparent={true}>
            <ImageViewer
                enableSwipeDown={false}
                backgroundColor='white'
                imageUrls={arr}/>
                <TouchableOpacity style={{position: 'absolute', right: 15, top:15}} onPress={() => setImageZoom(false)}>
                    <Image source={require("../ProductsNew/images/clos.png")}/>
                </TouchableOpacity>
        </Modal>


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
                    { product  ? product.item.pxumb_name.trim() : ''}
                </Text>
                <Text style={styles.chooseSize}>
                    Ընտրեք չափսը
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',width: 170}}>
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
                    {loaderSizes ? <View style={{width:10,marginTop:45}}>
                        <ActivityIndicator size="small" color="#0000ff"/>
                    </View>: null}
                </View>

                <View style={{width: 300, marginBottom: 10}}>
                    <Text style={styles.balanceText}>Մնացորդ՝ {mnac ? mnac.split('.0000') : ''} </Text>
                    <Text style={styles.balanceText}>Չձևակերպված մնացորդ՝ {chdzmnac ? chdzmnac : ''} </Text>
                </View>

                <Stepper
                    value={count}
                    onChangeCount={(value) => setCount(value)}/>
                {price ?
                    <View style={styles.costCount}>
                    <Text style={styles.costCountText}> {price ? price.split('.0000') : null} դրամ </Text>
                </View>
                    : null}
                <ProductsCheckBox activeTypeIndex={activeTypeIndex} setActiveTypeIndex={setActiveTypeIndex}/>

                <View style={styles.costContainer}>
                    <TouchableOpacity onPress={addProduct}
                                        disabled={!canSubmit}
                                        style={canSubmit ? styles.addToCartButton : styles.addToCartButtonOp}>
                        <Text style={styles.addToCartText}>
                            Ավելացնել զամբյուղ
                            <Image
                                style={styles.addToCartImg}
                                source={require("../ProductsNew/images/shoping.png")}/>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    </View>);

};

const mapStateToProps = (state) => ({
    selectedProducts: state.ProductsReducer.selectedProducts,
});

const mapDispatchToProps = (dispatch) => ({
    addProductToBasket: (value) => dispatch(adProducts(value))
});

export default connect(mapStateToProps,mapDispatchToProps) (ProductItem)

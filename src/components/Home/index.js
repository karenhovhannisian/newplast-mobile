import React, {useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground, TouchableOpacity, ActivityIndicator,Button} from 'react-native';
import styles from "./styles";
import {getOldOrders, getProducts} from "../../redux/actions";
import {connect} from "react-redux";
import LogOut from "../LogOut";
const Home = ({getOldOrders, oldOrders, getProducts, products,loaderProducts, ...props}) => {
    const {navigate} = props.navigation;

    const [loaderProd, setLoaderProd] = useState(false);
    const [loaderOldOrders, setLoaderOldOrders] = useState(false);
    const [loaderDept, setLoaderDept] = useState(false);
    useEffect(() => {
        if (loaderProducts) {
            onNavigateProducts()
        }

    }, [loaderProducts]);

    const startLoadingProducts = () => {
        if (products && !products.length) {
            setLoaderProd(true);
            getProducts();
        } else {
            onNavigateProducts()
        }
    };

    const onNavigateProducts = () => {
        setLoaderProd(false);
        navigate('orderCreate')
    };

    const startLoadingOldOrders = () => {
        if (oldOrders && !oldOrders.length) {
            getOldOrders();
        }
        onNavigateOldOrders()
        // setLoaderOldOrders(true);
        // setTimeout(onNavigateOldOrders, 100)
    };

    const onNavigateOldOrders = () => {
        setLoaderOldOrders(false);
        navigate('Order')
    };

    return (
        <ImageBackground source={require("./images/home.png")}
                         style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <View style={{marginTop: 0, left: 0, position: 'absolute'}}>
                <View style={{marginTop: 40, marginLeft: 40}}>
                    <Text style={{color: 'white', fontSize: 40}}>Բարի Գալուստ</Text>
                    <Text style={{color: 'white', fontSize: 25}}>NewPlast կառավարման համակարգ</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.sectionContainer}>

                    <TouchableOpacity onPress={startLoadingOldOrders}>
                        {loaderOldOrders ? <View style={[styles.containers, styles.horizontal]}>
                                <ActivityIndicator size="large" color="#0000ff"/>
                            </View> :
                            <Image
                                style={{
                                    transform: [{rotate: '-45deg'}],
                                    width: 150,
                                    height: 150,
                                }}
                                source={require('./images/Group2.png')}
                            />}
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionTitle}>
                    <TouchableOpacity onPress={startLoadingProducts}>
                        {loaderProd ? <View style={[styles.containers, styles.horizontal]}>
                                <ActivityIndicator size="large" color="#0000ff"/>
                            </View> :
                            <Image
                                style={{
                                    transform: [{rotate: '-45deg'}],
                                    width: 150,
                                    height: 150,
                                    marginLeft: -10
                                }}
                                source={require('./images/Group1.png')}
                            />}
                    </TouchableOpacity>

                </View>
                <View style={styles.section3}>
                    <TouchableOpacity onPress={() => navigate('Debt')}>
                        <Image
                            style={{
                                transform: [{rotate: '-45deg'}],
                                width: 150,
                                height: 150
                            }}
                            source={require('./images/Group3.png')}
                        />
                    </TouchableOpacity>
                </View>
                <LogOut navigation={props.navigation} />
            </View>
        </ImageBackground>

    );
};

const mapStateToProps = (state) => ({
    products: state.ProductsReducer.products,
    loaderProducts: state.ProductsReducer.loaderProducts,
    oldOrders: state.OrdersReducer.oldOrders,
});

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    getOldOrders: () => dispatch(getOldOrders()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home)




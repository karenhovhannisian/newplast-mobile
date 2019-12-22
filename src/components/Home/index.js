import React, {useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from "./styles";
import {getDebtList, getOldOrders, getProducts} from "../../redux/actions";
import {connect} from "react-redux";
import LogOut from "../LogOut";

const Home = ({getOldOrders, oldOrders, getProducts, products, loaderProducts, loaderOldOrders, getDebtList, debtList, loaderDebtList, ...props}) => {

    const {navigate} = props.navigation;

    console.log( loaderDebtList , 'debtList')

    useEffect(() => {
        if (products) {
            onNavigateProducts()
        }
    }, [loaderProducts  === true]);

    useEffect(() => {
        if (debtList) {
            navigate('Debt')
        }
    }, [loaderDebtList === true]);

    useEffect(() => {
        if (oldOrders) {
            onNavigateOldOrders()
        }
    }, [loaderOldOrders  === true]);

    const startLoadingProducts = () => {
        getProducts();
    };

    const onNavigateProducts = () => {
        navigate('orderCreate')
    };

    const startLoadingOldOrders = () => {
        getOldOrders();
    };

    const onNavigateOldOrders = () => {
        navigate('Order')
    };

    const startLoadingDebt = () => {
        getDebtList();
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
                        {loaderProducts ? <View style={[styles.containers, styles.horizontal]}>
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
                    {loaderDebtList ? <View style={[styles.containers, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View> :
                        <TouchableOpacity onPress={startLoadingDebt}>
                            <Image
                                style={{
                                    transform: [{rotate: '-45deg'}],
                                    width: 150,
                                    height: 150
                                }}
                                source={require('./images/Group3.png')}
                            />
                        </TouchableOpacity>
                    }
                </View>
                <LogOut navigation={props.navigation}/>
            </View>
        </ImageBackground>

    );
};

const mapStateToProps = (state) => ({
    products: state.ProductsReducer.products,
    loaderProducts: state.ProductsReducer.loaderProducts,
    oldOrders: state.OrdersReducer.oldOrders,
    loaderOldOrders: state.OrdersReducer.loaderOldOrders,
    debtList: state.DebtReducer.debtList,
    loaderDebtList: state.DebtReducer.loaderDebtList,
});

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    getOldOrders: () => dispatch(getOldOrders()),
    getDebtList: () => dispatch(getDebtList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home)




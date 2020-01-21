import React, {useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground, TouchableOpacity, ActivityIndicator, Modal} from 'react-native';
import styles from "./styles";
import {
    attemptLogOut,
    attemptLogOutSuccess,
    getDebtList,
    getOldOrders,
    getProducts,
    getProductsType
} from "../../redux/actions";
import {connect} from "react-redux";
import LogOut from "../LogOut";
import cache from "../../Common/Cache";
import PermModal from "../PermModal";
import store from "../../redux/store";

const Home = ({getOldOrders, oldOrders, getProductsType, getProducts, products, loaderProducts, loaderOldOrders, getDebtList, debtList, loaderDebtList, ...props}) => {

    const {navigate} = props.navigation;

    const [showModal, setShowModal] = useState(false);
    const [mnor, setMnor] = useState(null);

    useEffect(() => {
        cache.getItem("mnor", function (err, value) {
            setMnor(value)
        });
        if (mnor == 7) {
            setShowModal(true)
        }
        if (products && products.length && !loaderProducts ) {
            onNavigateProducts()
        }
    }, [loaderProducts]);
    useEffect(() => {
        if (debtList && debtList.length && !loaderDebtList) {
            navigate('Debt')
        }
    }, [loaderDebtList]);

    useEffect(() => {
        if (oldOrders && oldOrders.length && !loaderOldOrders) {
            onNavigateOldOrders()
        }
    }, [loaderOldOrders]);

    const startLoadingProducts = () => {
        getProducts();
        getProductsType()
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
            <TouchableOpacity onPress={() => store.dispatch(attemptLogOutSuccess())} style={{position: 'absolute', right:5, top: 20}} >
                <Image
                    source={require('./images/7777.png')}
                    style={{ marginRight:30 }}
                />
            </TouchableOpacity>
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
                <Modal
                    transparent={true}
                    visible={showModal}
                >
                    <PermModal setShowModal={setShowModal}/>
                </Modal>
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
    showFailMessage: state.AuthReducer.showFailMessage,
});

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    getOldOrders: () => dispatch(getOldOrders()),
    getDebtList: () => dispatch(getDebtList()),
    getProductsType: () => dispatch(getProductsType()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home)




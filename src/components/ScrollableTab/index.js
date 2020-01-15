import React, {useEffect, useState} from "react";
import {ScrollableTabView} from "@valdio/react-native-scrollable-tabview";
import {Image, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../Basket/styles";
import {connect} from "react-redux";
import {confirmOrder, deleteSelectedProduct, sendOrderList} from "../../redux/actions";
import CreateOrderSuccessModal from "../CreateOrderSuccessModal";

const ScrollableTab = ({selectedProducts, deleteSelectedProduct, sendOrderList, confirmOrder, confirmOrderSuccess, customerName, selectedManager, orderDataSuccess, data, filteredTabs}) => {

    if (!filteredTabs.length) {
        return <View style={{justifyContent: 'center', alignItems: 'center', flex: 2}}>
            <Image style={{width: 400, height: 210, marginTop: 10}}
                   source={require('./images/shopping.png')}
            />
            <Text style={{fontSize: 25, color: '#444', marginTop: 20, fontWeight: 'bold'}}>
                Զամբյուղը դատարկ է
            </Text>
        </View>
    }

    // console.log(orderDataSuccess, 'orderDataSuccess');
    const removeSelectedProduct = (elIndex, psize, tab) => {

        if (orderDataSuccess) {
            const data = orderDataSuccess && orderDataSuccess.find(el => el.aah === tab);
            data.apr_cank =data.apr_cank && data.apr_cank.map(el => {
                if (el.aprcod.trim() === elIndex.trim()) {
                   el.aprcod = `-${el.aprcod }`
                }
                return el
            });

            console.log(data, 'data');
            sendOrderList([[data]]);
            deleteSelectedProduct(elIndex, psize, tab);
        } else {
            deleteSelectedProduct(elIndex, psize, tab);
        }
    };

    const confirmOrderData = () => {
        let patcode = orderDataSuccess && orderDataSuccess.map(el => {
                return el.patcod

        });
        const reducer = (accumulator, currentValue) => accumulator + ',' +  currentValue;
        let data = patcode.reduce(reducer)
        // if (confirmOrderSuccess && confirmOrderSuccess[0].pstatus===1){
        //     setShowModal(true)
        // }
        confirmOrder(data)

    };

    const orderDataCount = orderDataSuccess && orderDataSuccess.reduce((sum, cur) =>  +sum + +cur.sgumar, 0)
    const orderDataZgin = orderDataSuccess && orderDataSuccess.reduce((sum, cur) =>  +sum + +cur.zgumar, 0)
    console.log(orderDataCount, 'orderDataCount');
    return (
        <ScrollableTabView
            tabBarBackgroundColor={'white'}
            tabBarActiveTextColor={'#0A3695'}
            tabBarTextStyle={{fontSize: 25}}
            style={{width: '100%', borderRadius: 50}}
            disableTabBarOnLayout={true}
            tabBarInactiveTextColor={'#161616'}
            tabBarUnderlineStyle={{
                height: 3,
                backgroundColor: '#0A3695',
                borderRadius: 2,
            }}
        >
            {filteredTabs.map((tab) => {
                return <View style={{height: '100%', backgroundColor: '#F7F7F9'}} tabLabel={tab.title} disable={true}
                             key={tab.title}>
                    <View style={styles.content}>
                        <ScrollView style={styles.scrollView}>
                            <View style={{height: '100%'}}>
                                {selectedProducts && selectedProducts.filter(p => p.type === tab.title).map((element, elIndex) => {
                                    return <View style={styles.content1}>
                                        <Image style={{width: 120, height: 100, marginLeft: 10}}
                                               source={require('./images/www.jpg')}
                                        />
                                        <View style={{
                                            width: '80%',
                                            flexDirection: 'row',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>

                                            <View style={{marginLeft: '2%',}}>
                                                <Text style={{
                                                    fontSize: 22,
                                                    color: '#0A3695',
                                                    marginTop: 5,
                                                    fontWeight: 'bold',
                                                }}>
                                                    {element.name.split(' ', 2)}
                                                </Text>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <Text style={{fontSize: 18, color: 'black'}}>
                                                        Չափսը՝
                                                    </Text>
                                                    <Text style={styles.touchable}>
                                                        {element.psize}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginTop: 5,
                                                }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 18,
                                                            color: 'black',
                                                            marginRight: 10
                                                        }}>
                                                        Քանակը՝
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 18,
                                                        textAlign: 'center',
                                                        width: 80,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'

                                                    }}>    {element.qanak.toString()} {element.quantityPrice} </Text>

                                                </View>
                                            </View>
                                            <View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    display: 'flex',
                                                    justifyContent: 'space-around',
                                                    marginLeft: '15%'
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        marginTop: 30
                                                    }}>
                                                        <Text style={{fontSize: 18, color: 'black', width: 150}}>
                                                            {/*ԶԵղչված Գին՝*/}
                                                        </Text>
                                                        <Text style={{
                                                            fontSize: 18,
                                                            color: '#F20732',
                                                            height: 30,
                                                            width: 120
                                                        }}>
                                                            {/*150 դրամ*/}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    display: 'flex',
                                                    justifyContent: 'space-around',
                                                    marginLeft: '15%',
                                                }}>
                                                    <Text style={{
                                                        fontSize: 18,
                                                        color: 'black',
                                                        width: 90
                                                    }}> Գինը՝</Text>
                                                    <Text style={{
                                                        fontSize: 24,
                                                        color: '#0A3695',
                                                        // left: 158,
                                                        height: 40,
                                                        width: 130
                                                    }}> {element.price ? element.price.split('.0000') : ''}
                                                        {element.price ? 'դրամ' : ''}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => removeSelectedProduct(element.aprcod, element.psize, tab.title)}>
                                                <Image style={{marginTop: 22, marginRight: 0}}
                                                       source={require('./images/close.png')}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                })}
                            </View>
                        </ScrollView>

                    </View>
                    <View style={{
                        marginLeft: '5%',
                        width: '93%'
                    }}>
                        <View style={{
                            flexDirection: 'row-reverse',
                            alignContent: 'flex-end',
                            marginLeft:40
                        }}>
                            <View>
                                <View style={{marginTop: 0, marginLeft: 8}}>
                                    <View>
                                        <Text style={{fontSize: 18}}>Գին` {orderDataCount ? orderDataCount : ''}
                                            {orderDataCount ? 'դրամ' : ''}</Text>

                                    </View>

                                    <Text style={{fontSize: 18, color: '#F20732'}}>Զեղչված գումար` {orderDataZgin ? orderDataZgin : ''}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        fontSize: 24,
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}> Ընդհանուր՝</Text>
                                    <Text style={{
                                        flexDirection: 'row',
                                        textAlign: 'center',
                                        fontSize: 24,
                                        color: '#0A3695',
                                        fontWeight: 'bold',
                                        left: 0,
                                        height: 30,
                                        width: 170,
                                    }}> {orderDataCount ? orderDataCount-orderDataZgin : ''}
                                        {orderDataCount ? 'դրամ' : ''}
                                    </Text>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        disabled={!customerName}
                                        onPress={confirmOrderData}
                                        style={customerName ? styles.addButton: styles.addButtonDisable}>
                                        <Text style={styles.addText}>
                                            Հաստատել
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <Modal
                            transparent={true}
                            visible={confirmOrderSuccess && confirmOrderSuccess[0].pstatus == 1}
                        >
                            <CreateOrderSuccessModal/>
                        </Modal>
                    </View>
                </View>
            })}

        </ScrollableTabView>
    )
};

const mapStateToProps = (state) => ({
    selectedProducts: state.ProductsReducer.selectedProducts,
    orderDataSuccess: state.BasketReducer.orderDataSuccess,
    confirmOrderSuccess: state.BasketReducer.confirmOrderSuccess
});

const mapDispatchToProps = (dispatch) => ({
    deleteSelectedProduct: (elIndex, psize, tab) => dispatch(deleteSelectedProduct(elIndex, psize, tab)),
    sendOrderList: (data) => dispatch(sendOrderList(data)),
    confirmOrder: (data) => dispatch(confirmOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollableTab)

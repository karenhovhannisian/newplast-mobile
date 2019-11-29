import React from "react";
import {ScrollableTabView} from "@valdio/react-native-scrollable-tabview";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../Basket/styles";
import {connect} from "react-redux";
import {deleteSelectedProduct} from "../../redux/actions";

const ScrollableTab = ({selectedProducts, deleteSelectedProduct}) => {

    const tabs = [
        {
            id: 0,
            title: 'Այո'
        },
        {
            id: 1,
            title: 'Ոչ'
        },
        {
            id: 2,
            title: 'C4'
        },
        {
            id: 3,
            title: 'C5'
        }
    ];


    const filteredTabs = [];
    tabs.forEach(tab => {
        if (selectedProducts && selectedProducts.map(e => e.type).includes(tab.id)) {
            filteredTabs.push(tab)
        }
    });

    if (!filteredTabs.length) {
        return <View style={{justifyContent: 'center', alignItems: 'center', flex: 2}}>
            <Image style={{width: 400, height: 210, marginTop: 10}}
                   source={require('./images/shopping.png')}
            />
            <Text style={{fontSize: 25,color: '#444', marginTop: 20, fontWeight:'bold'}}>
                Զամբյուղը դատարկ է
            </Text>
        </View>
    }

    const removeSelectedProduct = (elIndex,size) => {
        deleteSelectedProduct(elIndex, size)
    };


    // console.log(filteredTabs);

    return (
        <ScrollableTabView
            tabBarUnderlineStyle={{borderRadius: 25,}}
            tabBarBackgroundColor={'white'}
            tabBarActiveTextColor={'#0A3695'}
            tabBarTextStyle={{fontSize: 25}}
            style={{width: '100%', borderRadius: 50}}
            disableTabBarOnLayout={true}
            tabBarInactiveTextColor={'#161616'}
            tabBarUnderlineStyle={{ height: 3,
                backgroundColor: '#0A3695',
                borderRadius: 2,
                }}

        >
            {
                filteredTabs.map(tab => (
                    <View style={{height: '100%', backgroundColor: '#F7F7F9'}} tabLabel={tab.title} disable={true} key={tab.title}>
                        <View style={styles.content}>
                            <ScrollView style={styles.scrollView}>
                                <View style={{height: '100%'}}>
                                    {selectedProducts && selectedProducts.filter(p => p.type === tab.id).map((element, elIndex) => {
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

                                                <View style={{marginLeft:'2%',}}>
                                                    <Text style={{fontSize: 22, color: '#0A3695', marginTop: 5, fontWeight:'bold',}}>
                                                        {element.name.split(' ',2) }
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
                                                                {element.size}
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
                                                                // marginTop: 10,
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

                                                        }}>    {element.count.toString()} {element.quantityPrice} </Text>

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
                                                            <Text style={{fontSize: 18, color: 'black', width: 150}}>ԶԵղչված
                                                                Գին՝</Text>
                                                            <Text style={{
                                                                fontSize: 18,
                                                                color: '#FF0000',
                                                                height: 30,
                                                                width: 120
                                                            }}> 150 դրամ</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        display: 'flex',
                                                        justifyContent: 'space-around',
                                                        marginLeft: '15%',
                                                        // marginTop: 20
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
                                                        }}> {element.price.split('.0000')} դրամ</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity onPress={() => removeSelectedProduct(element.id, element.size)}>
                                                    <Image style={{ marginTop: 17}}
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
                            flexDirection: 'row',
                            marginLeft:'6%',
                            width:'93%'
                        }}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View>
                            <View style={{marginTop: '16%', marginLeft: 8  }}>
                                <Text style={{fontSize: 18}}>Գին`</Text>
                                <Text style={{fontSize: 18}}>Զեղչված գին`</Text>
                            </View>

                                <View  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                            <Text style={{fontSize: 24, color: 'black',fontWeight:'bold',}}> Ընդհանուր՝</Text>
                            <Text style={{
                                flexDirection:'row',
                                textAlign:'center',
                                fontSize: 24,
                                color: '#0A3695',
                                fontWeight:'bold',
                                left: 20,
                                height: 30,
                                width: 140
                            }}> 570 դրամ</Text>
                                </View>
                            </View>

                        </View>
                            <TouchableOpacity
                                style={styles.addButton}>
                                <Text style={styles.addText}>
                                    Հաստատել
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            }

        </ScrollableTabView>
    )
};

const mapStateToProps = (state) => ({
    selectedProducts: state.ProductsReducer.selectedProducts,

});

const mapDispatchToProps = (dispatch) => ({
    deleteSelectedProduct: (elIndex, size) => dispatch(deleteSelectedProduct(elIndex, size)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollableTab)

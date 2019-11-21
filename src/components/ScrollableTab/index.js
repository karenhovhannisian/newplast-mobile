import React from "react";
import {ScrollableTabView} from "@valdio/react-native-scrollable-tabview";
import {Image, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from "../Basket/styles";
import {Button} from "react-native-elements";
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
        console.log(selectedProducts && selectedProducts.map(e => e.type).includes(tab.id))
        if (selectedProducts && selectedProducts.map(e => e.type).includes(tab.id)) {
            filteredTabs.push(tab)
        }
        // selectedProducts && selectedProducts.map(e => e.type).includes(tab.id)
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

    const removeSelectedProduct = (elIndex) => {
        console.log(elIndex, 'index');
        deleteSelectedProduct(elIndex)
    };


    console.log(filteredTabs);

    return (
        <ScrollableTabView
            tabBarUnderlineStyle={{borderRadius: 25}}
            tabBarBackgroundColor={'white'}
            tabBarActiveTextColor={'red'}
            style={{width: '100%', borderRadius: 50}}
            disableTabBarOnLayout={true}
            tabBarInactiveTextColor={'blue'}
        >
            {
                filteredTabs.map(tab => (
                    <View style={{height: '90%'}} tabLabel={tab.title} disable={true} key={tab.title}>
                        <View style={styles.content}>
                            <ScrollView style={styles.scrollView}>
                                <View style={{height: '100%'}}>
                                    {selectedProducts && selectedProducts.filter(p => p.type === tab.id).map((element, elIndex) => {
                                        return <View style={styles.content1}>
                                            <Image style={{width: 100, height: 100, marginLeft: 10}}
                                                   source={require('./images/www.jpg')}
                                            />
                                            <View style={{
                                                flexDirection: 'row',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}>

                                                <View style={{marginLeft:'7%'}}>
                                                    <Text style={{fontSize: 22, color: 'blue'}}>
                                                        {element.name}
                                                    </Text>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        <Text style={{fontSize: 20, color: 'black'}}>
                                                            Չափսը՝
                                                        </Text>
                                                        <TouchableOpacity>
                                                            <Text style={styles.touchable}>
                                                                {element.size}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 20,
                                                                color: 'black',
                                                                marginTop: 10,
                                                                marginRight: 20
                                                            }}>
                                                            Քանակը՝
                                                        </Text>
                                                        <Text style={{
                                                            fontSize: 25,
                                                            textAlign: 'center',
                                                            width: 80,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',

                                                        }}> {element.count.toString()} </Text>

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
                                                            marginTop: 15
                                                        }}>
                                                            <Text style={{fontSize: 20, color: 'black', width: 150}}>ԶԵղչված
                                                                Գին՝</Text>
                                                            <Text style={{
                                                                fontSize: 20,
                                                                color: 'red',
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
                                                        marginTop: 20
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: 'black',
                                                            width: 100
                                                        }}> Գինը՝</Text>
                                                        <Text style={{
                                                            fontSize: 24,
                                                            color: 'blue',
                                                            // left: 158,
                                                            height: 40,
                                                            width: 120
                                                        }}> 290 դրամ</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity onPress={() => removeSelectedProduct(element.id)}>
                                                    <Image style={{width: 20, height: 20, marginTop: 10}}
                                                           source={require('./images/close.png')}
                                                    />
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                    })}
                                </View>
                            </ScrollView>

                        </View>
                        <View style={{marginLeft: '60%', marginTop: 20}}>
                            <Text style={{fontSize: 18, }}>Գին`</Text>
                            <Text style={{fontSize: 18}}>Զեղչված գին`</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '42%'
                        }}>

                            <Text style={{fontSize: 26, color: 'black'}}> Ընդհանուր՝</Text>
                            <Text style={{
                                flexDirection:'row',
                                textAlign:'center',
                                fontSize: 24,
                                color: 'white',
                                left: 20,
                                height: 40,
                                backgroundColor: '#072C7D',
                                borderRadius: 20,
                                width: 140
                            }}> 570 դրամ</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.addButton}>
                            <Text style={styles.addText}>
                                Հաստատել
                            </Text>
                        </TouchableOpacity>
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
    deleteSelectedProduct: (elIndex) => dispatch(deleteSelectedProduct(elIndex)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollableTab)

import React, {useEffect, useState} from "react";
import {Image, Picker, View, ScrollView, TouchableOpacity, Text, Modal, TouchableHighlight} from "react-native";
import styles from './styles';
import {SearchBar} from 'react-native-elements';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import OrderHistory from "../OrderHistory";
import {connect} from "react-redux";
import {getOldOrders} from "../../redux/actions";
import moment from "moment";

const Order = ({oldOrders}) => {

    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [tableHead, setTableHead] = useState(['Հաճախորդի անուն', 'կոդ', 'Պատվերի ստեղծման օր', 'Պատվերի կոդ', '']);
    const [ordersData, setOrdersData] = useState(oldOrders);

    const updateSearch = (search) => {
        setSearch(search);
    };

    const _alertIndex = (index) => {
        setModalVisible(true)
    };

    const element = (data, index) => (
            <TouchableOpacity onPress={() => _alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Տեսնել ավելին</Text>
                </View>
            </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar
                    autoCorrect={false}
                    searchIcon
                        ={<Image style={{width: 20, height: 20}}
                                 source={require('./images/search.png')}/>}
                    containerStyle={{width: '25%', borderRadius: 35, height: 50}}
                    platform='android'
                    inputStyle={{width: '20%', height: 10}}
                    onChangeText={updateSearch}
                    value={search}
                    showCancel={true}
                    clearIcon={null}
                    cancelIcon={null}
                />
                <View style={styles.pickerView1}>
                    <Picker
                        // selectedValue={}
                        style={{color: 'blue',}}
                        itemStyle={styles.pickerItemStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                        <Picker.Item label="Տարածաշրջան" value="Տարածաշրջան"/>
                        <Picker.Item label="JavaScript" value="js"/>
                    </Picker>
                </View>
                <View style={styles.pickerView}>
                    <Picker
                        // selectedValue={}
                        style={{color: 'blue', fontSize: 50}}
                        itemStyle={styles.pickerItemStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                        <Picker.Item label="Ժամանակաշրջան" value="Ժամանակաշրջան"/>
                        <Picker.Item label="JavaScript" value="js"/>
                    </Picker>
                </View>
            </View>
            <View style={styles.containerTable}>
                <View>
                    <Table borderStyle={{borderColor: 'white'}}>
                        <Row data={tableHead} style={styles.headerTable} textStyle={styles.text}/>
                    </Table>

                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderColor: 'white', width: 10}}>
                            {
                                oldOrders.map((rowData, index,) => {

                                    return <TableWrapper key={index} style={styles.row}>
                                        <Text style={styles.texts}>{'Bari Chanaparh'}</Text>
                                        <Text style={styles.texts}>{rowData.gycod}</Text>
                                        <Text style={styles.texts}>{moment(rowData.sdate).format("MM-DD-YYYY")}</Text>
                                        <Text style={styles.texts}>{rowData.patcod}</Text>
                                        {element(index)}
                                    </TableWrapper>
                                })
                            }
                            {/*{*/}
                            {/*    tableData.map((rowData, index,) => (*/}

                            {/*        <TableWrapper key={index} style={styles.row}>*/}
                            {/*            {*/}
                            {/*                rowData.map((cellData, cellIndex) => (*/}
                            {/*                    <Cell key={cellIndex}*/}
                            {/*                          data={cellIndex === 4 ? element(cellData, index) : cellData}*/}
                            {/*                          textStyle={styles.texts}/>*/}
                            {/*                ))*/}
                            {/*            }*/}
                            {/*        </TableWrapper>*/}
                            {/*    ))*/}
                            {/*}*/}
                        </Table>
                    </ScrollView>

                </View>

            </View>
            {/*<Footer/>*/}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <OrderHistory ordersData={ordersData}/>
                <TouchableHighlight
                    style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#072C7D',
                        position: 'absolute',
                        right: 10,
                        top: 12,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <Image style={{width: 25, height: 25}}
                           source={require("./images/close.png")}/>
                </TouchableHighlight>
            </Modal>
        </View>
    )
};

const mapStateToProps = (state) => ({
    oldOrders: state.OrdersReducer.oldOrders,
});

const mapDispatchToProps = (dispatch) => ({
    getOldOrders: () => dispatch(getOldOrders()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Order);

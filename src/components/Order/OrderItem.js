import React, {useState} from "react";
import {View, ScrollView} from "react-native";
import styles from './styles';
import {Table, Row} from 'react-native-table-component';
import {connect} from "react-redux";
import {getOldOrders} from "../../redux/actions";
import OrderTableItem from "./OrderTableItem";

const OrderItem = ({oldOrders}) => {

    console.log(oldOrders, 'ffff');

    const [tableHead, setTableHead] = useState(['Հաճախորդի անուն', 'կոդ', 'Պատվերի ստեղծման օր', 'Պատվերի կոդ', '']);

    return (
        <View style={styles.container}>
            <View style={styles.containerTable}>
                <View>
                    <Table borderStyle={{borderColor: 'white', width:150}}>
                        <Row flexArr={[2.2, 2.4, 1.9, 2.2,1.5]} data={tableHead} style={styles.headerTable} textStyle={styles.text}/>
                    </Table>

                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderColor: 'white', width: 10}}>
                            {
                                oldOrders && oldOrders.map((rowData, index,) => {
                                    return <OrderTableItem index={index} oldOrders={oldOrders} rowData={rowData}/>
                                })
                            }
                        </Table>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
};

const mapStateToProps = (state) => ({
    oldOrders: state.OrdersReducer.oldOrders,
});

const mapDispatchToProps = (dispatch) => ({
    getOldOrders: () => dispatch(getOldOrders()),
});


export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);

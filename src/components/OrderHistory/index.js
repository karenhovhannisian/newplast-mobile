import React, {useState} from "react";
import {View, Text, ScrollView} from "react-native";
import styles from './styles';
import {Cell, Row, Table, TableWrapper} from "react-native-table-component";
import moment from "moment";

const OrderHistory = ({ordersData}) => {
    // console.log(ordersData.apr_cank.map(el => el), 'ordersDatasssss');
    const [tableHead, setTableHead] = useState([`Պատվերի կոդ՝ ${ordersData.patcod}`, '',`${moment(ordersData.sdate).format("MM-DD-YYYY")}`]);
    const [tableData, setTableData] = useState(ordersData ? ordersData.apr_cank : []);
    const [tableHeadData, setTableHeadData] = useState(
        ['Պատվերի անուն', '                                                      Չափս', '                                  Քանակ', '          Գին']);
    const [data, setData] = useState([
        ['Հաճախորդի անուն', `${ordersData.gyanun}`,''],
        ['Կոդ', `${ordersData.gycod}`,''],
        ['Տիպ', `${ordersData.aah}`,''],
        ['Ընդհանուր գին', `${ordersData.sgumar} դրամ`,''],
        ['Զեղչված գին', `${ordersData.apr_cank[0].zexch}`,''],

    ]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Պատվերի պատմություն</Text>
            </View>
            <View style={styles.body}>
                    <View style={styles.containerTable}>
                        <View>
                            <Table borderStyle={{borderColor: 'white'}}>
                                <Row data={tableHead} style={styles.headerTable} textStyle={styles.text}/>
                            </Table>

                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={{borderColor: 'black', width: 10}}>
                                    {
                                        data.map((rowData, index,) => (

                                            <TableWrapper key={index} style={styles.row}>
                                                {
                                                    rowData.map((cellData, cellIndex) => (
                                                        <Cell key={cellIndex}
                                                              data={ cellData}
                                                              textStyle={styles.texts}/>
                                                    ))
                                                }
                                            </TableWrapper>
                                        ))
                                    }
                                </Table>
                            </ScrollView>

                        </View>
                    </View>


                <View style={styles.containerTable1}>
                    <View>
                        <Table borderStyle={{borderColor: 'white'}}>
                            <Row data={tableHeadData} style={styles.headerTable} textStyle={styles.text}/>
                        </Table>

                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ width: 10}}>
                                {
                                    tableData.map((rowData, index,) => (
                                        <TableWrapper key={index} style={styles.row}>
                                            {/*<View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:'100%'}}>*/}
                                            <Text style={styles.texts2}>{rowData.apranun}</Text>
                                            <Text style={styles.texts1}>{rowData.gumar}</Text>
                                            <Text style={styles.texts1}>{rowData.qanak}</Text>
                                            <Text style={styles.texts1}>{rowData.gin}</Text>
                                            {/*</View>*/}
                                        </TableWrapper>
                                    ))
                                }
                            </Table>
                        </ScrollView>

                    </View>
                </View>
            </View>
        </View>
    )
};

export default OrderHistory




import React, {useState} from "react";
import {View, Text, ScrollView} from "react-native";
import styles from './styles';
import {Cell, Row, Table, TableWrapper} from "react-native-table-component";

const OrderHistory = ({ordersData}) => {

    const [tableHead, setTableHead] = useState(['Պատվերի կոդ՝ ե19-7769', '','2019/10/08']);
    const [tableData, setTableData] = useState([
        ['PEX-AL-PEX', '16 մմ', 'x 1', '291 դրամ'],
        ['PEX-AL-PEX', '16 մմ', 'x 1', '291 դրամ'],
        ['PEX-AL-PEX', '16 մմ', 'x 1', '291 դրամ'],
        ['PEX-AL-PEX', '16 մմ', 'x 1', '291 դրամ'],
        ['PEX-AL-PEX', '16 մմ', 'x 1', '291 դրամ'],
        ['PEX-AL-PEX', '16 մմ', 'x 1', '291 դրամ'],
    ]);
    const [tableHeadData, setTableHeadData] = useState(['Պատվերի անուն', 'Չափս', 'Քանակ', 'Գին']);
    const [data, setData] = useState([
        ['Հաճախորդի անուն', 'Ա/Ձ Սզբեկյան Արման',''],
        ['Կոդ', '120120222',''],
        ['Տիպ', 'Այո',''],
        ['Ընդհանուր գին', '2800դրամ',''],
        ['Զեղչված գին', ' 2250դրամ',''],

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
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell key={cellIndex}
                                                          data={ cellData}
                                                          textStyle={styles.texts1}/>
                                                ))
                                            }
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

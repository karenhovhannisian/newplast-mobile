import React, {useState} from "react";
import {Image, Modal, ScrollView, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {SearchBar} from "react-native-elements";
import {Cell, Row, Table, TableWrapper} from "react-native-table-component";
import OrderHistory from "../OrderHistory";

const Debt = () => {
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [tableHead, setTableHead] = useState(['Հաճախորդի անուն', 'կոդ', 'ԶԵղչ', 'Պարտք' ]);
    const [tableData, setTableData] = useState([
        ['test test', '378', '22000 դրամ', '8000 դրամ', ],
        ['test test', '378', '22000 դրամ', '8000 դրամ', ],
        ['test test', '378', '22000 դրամ', '8000 դրամ', ],
        ['test test', '378', '22000 դրամ', '8000 դրամ', ],
        ['test test', '378', '22000 դրամ', '8000 դրամ', ],
        ['test test', '378', '22000 դրամ', '8000 դրամ', ],
        ['test test', '378', '22000 դրամ', '8000 դրամ', ],
        ['test test', '378', '22000 դրամ', '8000 դրամ', ],
    ]);

    const element = (data, index) => (
            <View style={styles.btn}>
                <Text style={styles.btnText}>{data}</Text>
            </View>
    );
    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar
                    autoCorrect={false}
                    searchIcon
                        ={<Image style={{width: 20, height: 20}}
                                 source={require('./images/search.png')}/>}
                    containerStyle={{width: '25%', borderRadius: 35, height: 50,marginLeft:50}}
                    platform='android'
                    inputStyle={{width: '20%', height: 10,}}
                    onChangeText={updateSearch}
                    value={search}
                    showCancel={true}
                    clearIcon={null}
                    cancelIcon={null}
                />
            </View>
            <View style={styles.containerTable}>
                <View>
                    <Table borderStyle={{borderColor: 'white'}}>
                        <Row data={tableHead} style={styles.headerTable} textStyle={styles.text}/>
                    </Table>

                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderColor: 'white', width: 10}}>
                            {
                                tableData.map((rowData, index,) => (

                                    <TableWrapper key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex}
                                                      data={cellIndex === 3 ? element(cellData, index): cellData}
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
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <OrderHistory/>
                <TouchableHighlight
                    style={{width: 50, height: 50, backgroundColor: '#072C7D', position: 'absolute', right:10,top:12, alignItems: 'center', justifyContent: 'center'}}
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

export default Debt

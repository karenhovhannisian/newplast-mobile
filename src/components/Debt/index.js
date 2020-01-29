import React, {useState} from "react";
import {Image, ScrollView, Text, View} from "react-native";
import styles from "./styles";
import {SearchBar} from "react-native-elements";
import {Row, Table, TableWrapper} from "react-native-table-component";
import {connect} from "react-redux";
import Footer from "../Footer";

const Debt = (props) => {
    const {navigate} = props.navigation;
    const [search, setSearch] = useState('');
    const [tableHead, setTableHead] = useState(['Հաճախորդի անուն', '                      կոդ', '                       ԶԵղչ', '            Պարտք']);
    const updateSearch = (search) => {
        setSearch(search);
    };

    const filteredDebtList =props.debtList && props.debtList.filter(list => {
        return list.anun.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
        <>
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar
                    autoCorrect={false}
                    searchIcon
                        ={<Image style={{width: 20, height: 20}}
                                 source={require('./images/search.png')}/>}
                    containerStyle={{width: '25%', borderRadius: 35, height: 50, marginLeft: 50}}
                    platform='android'
                    inputStyle={{width: '20%', height: 10,}}
                    onChangeText={updateSearch}
                    value={search}
                    showCancel={true}
                    clearIcon={true}
                    cancelIcon={true}
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
                                filteredDebtList && filteredDebtList.map((rowData, index,) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        <Text style={styles.textss}>{rowData.anun}</Text>
                                        <Text style={styles.texts}>{rowData.men}</Text>
                                        <Text style={styles.texts1}>{rowData.zexch ? rowData.zexch : 0}</Text>
                                        <Text style={styles.texts2}>{rowData.partq}</Text>
                                    </TableWrapper>
                                ))
                            }
                        </Table>

                    </ScrollView>

                </View>

            </View>

        </View>
            <View style={{marginTop:'2.5%'}}>
                <Footer navigates={props.navigation} navigate={navigate}/>
            </View>
            </>
    )
};

const mapStateToProps = (state) => ({
    debtList: state.DebtReducer.debtList,
});

export default connect(mapStateToProps, null)(Debt)

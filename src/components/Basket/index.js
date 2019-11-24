import React, {useEffect, useState} from 'react';
import {View, Text, Image, Picker} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import ScrollableTab from "../ScrollableTab";
import {deleteSelectedProduct, getCustomerList, getManagerList} from "../../redux/actions";
const Basket = ({selectedProducts, managerList, getManagerList, getCustomerList,customerList}) => {


    useEffect(()=> {
        getManagerList();
        getCustomerList()
    },[]);

    const [selectedManager, setSelectedManager] = useState('');
    const [selectedCustomers, setSelectedCustomers] = useState('');
    const [selectedCustomersName, setSelectedCustomersName] = useState('');



    return (
        <>
            {selectedProducts.length ?
            <View style={styles.header}>
                <View style={styles.pickerView1}>
                    <Picker
                        selectedValue={selectedManager}
                        style={{color: '#0A3695',}}
                        itemStyle={{fontSize: 30,width:20,height:20, color:  'green', }}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedManager(itemValue)
                        }>
                        {managerList && managerList.map(man => {
                            return <Picker.Item  color={'#0A3695'} label = {man.men} value={man.men} />
                        })}

                    </Picker>
                </View>
                <View style={styles.pickerView2}>
                    <Picker
                        mode={"dropdown"}
                        placeholder={'ssss'}
                        selectedValue={selectedCustomers}
                        style={{color: '#0A3695',}}
                        itemStyle={{fontSize: 30, color:  'red'}}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCustomers(itemValue)
                        }>
                        {
                            customerList && customerList.map(cus => {
                                return <Picker.Item color={'#0A3695'} label={cus.hacse} value={cus.hacse}/>
                            })
                        }


                    </Picker>
                </View>
                <View style={styles.pickerView}>
                    <Picker
                        selectedValue={selectedCustomersName}
                        style={{color: '#0A3695', fontSize: 40}}
                        itemStyle={styles.pickerItemStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCustomersName(itemValue)
                        }>
                        {
                            customerList && customerList.map(cus => {
                                return <Picker.Item color={'#0A3695'} label={cus.anun} value={cus.anun}/>
                            })
                        }
                        {/*<Picker.Item label="Հաճախորդ" value="Հաճախորդ"/>*/}
                        {/*<Picker.Item label="------" value="-----"/>*/}
                    </Picker>
                </View>
            </View>: null}
        <ScrollableTab selectedProducts={selectedProducts}/>

            </>
    );
};

const mapStateToProps = (state) => ({
    selectedProducts: state.ProductsReducer.selectedProducts,
    managerList: state.BasketReducer.managerList,
    customerList: state.BasketReducer.customerList
});

const mapDispatchToProps = (dispatch) => ({

    getManagerList: () => dispatch(getManagerList()),
    getCustomerList: () => dispatch(getCustomerList()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Basket)


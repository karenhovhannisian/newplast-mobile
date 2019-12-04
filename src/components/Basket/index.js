import React, {useEffect, useState} from 'react';
import {View, Picker} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import ScrollableTab from "../ScrollableTab";
import {getCustomerList, getManagerList} from "../../redux/actions";
const Basket = ({selectedProducts, managerList, getManagerList, getCustomerList,customerList}) => {


    useEffect(()=> {
        getManagerList();
        getCustomerList()
    },[]);

    const [selectedManager, setSelectedManager] = useState('');
    const [selectedCustomers, setSelectedCustomers] = useState('');
    const [selectedCustomersName, setSelectedCustomersName] = useState(null);
    const [customerName, setCustomerName] = useState('');

    useEffect(()=> {
            const grouped = groupBy(pets, pet => pet.aktrg.trim());
            setSelectedCustomersName(grouped.get(selectedCustomers));

    },[selectedCustomers]);

    const groupBy = (list, keyGetter) => {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    };

    const pets = customerList ? customerList : [];
    const grouped = groupBy(pets, pet => pet.aktrg.trim());
    const keys = [...grouped.keys()];

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
                        <Picker.Item key={'unselectable'} label='Մենեջեր' value={0} />
                        {managerList && managerList.map(man => {
                            return <Picker.Item  color={'#0A3695'} label = {man.men} value={man.codn} />
                        })}

                    </Picker>
                </View>
                <View style={styles.pickerView2}>
                    <Picker
                        mode={"dropdown"}
                        selectedValue={selectedCustomers}
                        style={{color: '#0A3695',}}
                        itemStyle={{fontSize: 30, color:  'red'}}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCustomers(itemValue)
                        }>
                        <Picker.Item key={'unselectable'} label='Տարածաշրջան' value={0} />
                        {
                            keys && keys.map(key => {
                                return <Picker.Item color={'#0A3695'} label={key} value={key}/>
                            })
                        }


                    </Picker>
                </View>
                <View style={styles.pickerView}>
                    <Picker
                        selectedValue={customerName}
                        style={{color: '#0A3695', fontSize: 40}}
                        itemStyle={styles.pickerItemStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            setCustomerName(itemValue)
                        }>
                        <Picker.Item key={'unselectable'} label='Հաճախորդ' value={0} />
                        {
                            selectedCustomersName && selectedCustomersName.map(cus => {
                                return <Picker.Item color={'#0A3695'} label={cus.anun} value={cus.fCODE}/>
                            })
                        }
                    </Picker>
                </View>
            </View>: null}
        <ScrollableTab customerName={customerName} selectedManager={selectedManager} selectedProducts={selectedProducts}/>

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

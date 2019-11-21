import React, {useState} from 'react';
import {View, Text, Image, Picker} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import ScrollableTab from "../ScrollableTab";
const Basket = ({selectedProducts}) => {
    console.log(selectedProducts, 'basketi');
    const [value, onChangeText] = useState('0');

    return (
        <>
            {selectedProducts.length ?
            <View style={styles.header}>
                <View style={styles.pickerView1}>
                    <Picker
                        // selectedValue={}
                        style={{color: 'blue',}}
                        itemStyle={styles.pickerItemStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                        <Picker.Item label="Տարածաշրջան" value="Տարածաշրջան"/>
                        <Picker.Item label="------" value="-------"/>
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
                        <Picker.Item label="Հաճախորդ" value="Հաճախորդ"/>
                        <Picker.Item label="------" value="-----"/>
                    </Picker>
                </View>
            </View>: null}
        <ScrollableTab selectedProducts={selectedProducts}/>

            </>
    );
};

const mapStateToProps = (state) => ({
    selectedProducts: state.ProductsReducer.selectedProducts,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Basket)


import React, {useState} from "react";
import {Image, Picker, View} from "react-native";
import styles from './styles';
import {SearchBar} from 'react-native-elements';
import OrderItem from "./OrderItem";

const Order = () => {

    const [search, setSearch] = useState('');

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
                        style={{color: '#0A3695',}}
                        itemStyle={styles.pickerItemStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                        <Picker.Item label="Տարածաշրջան" value="Տարածաշրջան"/>
                        <Picker.Item label="Տարածաշրջան" value="Տարածաշրջան"/>
                    </Picker>
                </View>
                <View style={styles.pickerView}>
                    <Picker
                        // selectedValue={}
                        style={{color: '#0A3695', fontSize: 50}}
                        itemStyle={styles.pickerItemStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                        <Picker.Item label="Ժամանակաշրջան" value="Ժամանակաշրջան"/>
                        <Picker.Item label="Ժամանակաշրջան" value="Ժամանակաշրջան"/>
                    </Picker>
                </View>
            </View>
            <View style={styles.containerTable}>
                <OrderItem/>
            </View>
        </View>
    )
};

export default Order;

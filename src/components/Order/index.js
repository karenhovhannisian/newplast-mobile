import React, {useState} from "react";
import {Image, Picker, View} from "react-native";
import styles from './styles';
import {SearchBar} from 'react-native-elements';
import OrderItem from "./OrderItem";
import DatePicker from 'react-native-datepicker'
// import DatepickerRange from 'react-native-range-datepicker';

const Order = () => {

    const [search, setSearch] = useState('');
    const [date, setDate] = useState(new Date());
    console.log(date, 'date');
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
                {/*<View style={styles.pickerView1}>*/}
                {/*<Picker*/}
                {/*    // selectedValue={}*/}
                {/*    style={{color: '#0A3695',}}*/}
                {/*    itemStyle={styles.pickerItemStyle}*/}
                {/*    onValueChange={(itemValue, itemIndex) =>*/}
                {/*        this.setState({language: itemValue})*/}
                {/*    }>*/}
                {/*    <Picker.Item label="Տարածաշրջան" value="Տարածաշրջան"/>*/}
                {/*    <Picker.Item label="Տարածաշրջան" value="Տարածաշրջան"/>*/}
                {/*</Picker>*/}


                {/*</View>*/}
                <View style={styles.pickerView}>
                    <Picker
                        // selectedValue={}
                        style={{color: '#072C7D', fontSize: 50}}
                        itemStyle={styles.pickerItemStyle}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                        <Picker.Item label="Ժամանակաշրջան" value="Տարածաշրջան"/>
                        <Picker.Item label="Ժամանակաշրջան" value="Տարածաշրջան"/>
                    </Picker>


                </View>


            <DatePicker
                style={{width: 200,}}
                placeholder={'Ժամանակաշրջան'}
                date={date}
                mode="date"
                format="YYYY-MM-DD"
                minDate="2017-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                    },
                    dateInput: {
                        marginLeft: 36,
                        borderRadius: 25,
                        borderColor: 'white',
                        height: 50,
                        backgroundColor:'white'

                    },
                    dateText: {
                        color: '#072C7D'
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                    setDate(date)
                }}
            />
        </View>
            {/*<View style={{position:'absolute',  top:0 ,elevation:24}}>*/}
            {/*    <DatepickerRange    startDate={new Date()}*/}
            {/*                        maxMonth={12}*/}
            {/*   />*/}
            {/*</View>*/}
    <View style={styles.containerTable}>
        <OrderItem/>
    </View>
</View>
)
};

export default Order;

import React, {useState} from "react";
import {Image, Picker, TouchableOpacity, View} from "react-native";
import styles from './styles';
import {SearchBar} from 'react-native-elements';
import OrderItem from "./OrderItem";
import DatePicker from 'react-native-datepicker'
import Footer from "../Footer";

const Order = (props) => {
    const {navigate} = props.navigation

    const [search, setSearch] = useState('');
    const [date, setDate] = useState(null);

    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <>
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
                        clearIcon={true}
                        cancelIcon={true}
                    />
                    <View style={styles.pickerView}>
                    </View>
                    <DatePicker
                        style={{width: 200}}
                        placeholder={'Ժամանակ'}
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
                                backgroundColor: 'white'

                            },
                            dateText: {
                                color: '#072C7D'
                            }
                        }}
                        onDateChange={(date) => {
                            setDate(date)
                        }}
                    />
                    {date ? <TouchableOpacity style={{right:10, position: 'absolute'}} onPress={() => {setDate(null)}}>
                        <Image style={{width: 20, height: 20}}
                               source={require("./images/Closeess.png")}/>
                    </TouchableOpacity> : null}

                </View>

                <View style={styles.containerTable}>
                    <OrderItem date={date} search={search}/>
                </View>
            </View>
            <View style={{marginTop:25}}>
                <Footer navigate={navigate} navigates={props.navigation}/>
            </View>
        </>
    )
};

export default Order;

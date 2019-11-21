import React from "react";
import {createStackNavigator} from "react-navigation-stack";
import {Login, Home, CreateOrder, Products, Basket, Order,Debt, LogOut} from "../components";
import {Image, TouchableOpacity} from 'react-native';
import {attemptLogOut} from "../redux/actions";
import store from "../redux/store";

const Navigator = createStackNavigator({
    Login: {
        screen: Login, navigationOptions: ({navigation}) => ({
            title: `Մուտք հավելված`,
            header: null
        })
    },
    Home: {
        screen: Home, navigationOptions: ({navigation}) => ({
            title: `Գլխավոր`,
            header: null,
        })
    },
    Basket: {
        screen: Basket, navigationOptions: ({navigation}) => ({
            title: `Զամբյուղ`,
        })
    },
    orderCreate: {
        screen: CreateOrder, navigationOptions: ({navigation }) => ({
            title: `Պատվերի ստեղծում`,
            headerRight: (
                <>
                    <TouchableOpacity onPress={() => navigation.navigate('Basket')}>
                     <Image
                       source={require('./images/666.png')}
                       style={{  marginRight:50 }}
                     />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => store.dispatch(attemptLogOut())}>
                     <Image
                       source={require('./images/7777.png')}
                       style={{ marginRight:30 }}
                     />
                    </TouchableOpacity>
                </>
            ),
        })
    },
    Products: {
        screen: Products, navigationOptions: ({navigation}) => ({
            title: `MyCarousel`,
        })
    },
    LogOut: {
        screen:  LogOut, navigationOptions: ({navigation}) => ({
            title: `modal`,
        })
    },
    Order: {
        screen: Order, navigationOptions: ({navigation}) => ({
            title: `Նախկին պատվերներ`,
        })
    },
    Debt: {
        screen: Debt, navigationOptions: ({navigation}) => ({
            title: `Պարտք`,
        })
    },
}, {
    initialRouteName: 'Login',
});


export default Navigator

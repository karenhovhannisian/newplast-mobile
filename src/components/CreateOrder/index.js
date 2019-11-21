import React from 'react';
import {ImageBackground, View,} from 'react-native';
// import Products from "../Products";
import Products2 from "../ProductsNew";
import Footer from "../Footer";

const createOrder = (props) => {
    const {navigate} = props.navigation;
    return (
        <View>
            <ImageBackground source={require("./images/111.png")} style={{width: '100%', height: '80%', position: 'absolute'}}/>
            <View style={{height:'100%', width: '100%'}}>
            <Products2/>
            <Footer navigate={navigate}/>
            </View>
        </View>
    );
};




export default createOrder

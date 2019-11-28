import React from 'react';
import ProductCarousel from "./ProductCarousel";
import ProductFilter from "./ProductFilter";
import {View} from "react-native";

const Products = ({}) => {
    // console.log("PRODUCTS")
    return (
        <View style={{height:'90%'}}>
            <ProductCarousel/>
            <ProductFilter/>
        </View>

    );

};

export default Products

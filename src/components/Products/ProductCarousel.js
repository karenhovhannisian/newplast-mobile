import React, { useState} from 'react';
import { View, Dimensions} from 'react-native';
import styles from "../ProductsNew/styles";
import { getProducts} from "../../redux/actions";
import {connect} from "react-redux";
import Carousel, {Pagination} from "react-native-snap-carousel";
import ProductItem from "./ProductItem";


const ProductCarousel = ({products}) => {
    const [sliderWidth, setSliderWidth] = useState(Dimensions.get('window').width - 150);
    const [sliderItemWidth, setItemWidth] = useState(Dimensions.get('window').width - 150);
    // console.log(products.length);
    const onLayout = (e) => {
        // setSliderWidth(Dimensions.get('window').width - 300);
        // setItemWidth(Dimensions.get('window').width - 400);
    };

    const renderItem = (product, index) => (<ProductItem currentIndex={index} product={{item: product.item, index: index}}/>);

    return (
        <View style={styles.container}>
            <Carousel
                onLayout={onLayout}
                // initialNumToRender={products.length}
                data={products ? products : []}
                sliderWidth={sliderWidth}
                itemWidth={sliderItemWidth}
                renderItem={renderItem}
                // pagingEnable={true}

            />
        </View>);

};


const mapStateToProps = (state) => ({
    products: state.ProductsReducer.products,
});

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCarousel)

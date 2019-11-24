import React, {useState, useRef} from 'react';
import {Image, View, Modal, TouchableHighlight, Dimensions, TouchableOpacity} from 'react-native';
import Filters from "../Filters";
import styles from "./styles";
import {connect} from "react-redux";
import ProductItem from "./ProductItem";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


const Products = ({ products }) => {

    const carousel = useRef(null);
    const [doAnimation, setDoAnimation] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(Dimensions.get('window').width - 150);

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (

        <GestureRecognizer
            onSwipe={()=> console.log("onSwipeUp")}
            onSwipeUp={() => console.log("onSwipeUp")}
            onSwipeDown={() => console.log("onSwipeDown")}
            onSwipeLeft={() => currentIndex < products.length && setCurrentIndex(currentIndex + 1)}
            onSwipeRight={() => currentIndex && setCurrentIndex(currentIndex - 1)}
            config={config}

        >
            <TouchableOpacity
                style={{position: 'absolute', top: 200, left:20, elevation:50}}
                onPress={() => currentIndex && setCurrentIndex(currentIndex - 1)}>
                <Image
                    source={require("./images/left.png")}/>
            </TouchableOpacity>
            <View style={styles.container}>

            <View style={{
                width: sliderWidth
            }}>

                <ProductItem currentIndex={currentIndex} product={{item: products[currentIndex], index: currentIndex}}/>

            </View>
                <TouchableHighlight onPress={() => {
                    setModalVisible(!modalVisible)
                }}
                                    style={styles.modalVisible}>
                    <Image
                        style={{width: 80, height: 80}}
                        source={require("./images/filter.png")}/>
                </TouchableHighlight>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <Filters/>
                <TouchableHighlight
                    style={styles.modalVisibleClose}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Image style={{width: 25, height: 25}}
                           source={require("./images/close.png")}/>
                </TouchableHighlight>
            </Modal>
            <TouchableOpacity
                style={{position: 'absolute',top: 200,  right: 20, elevation:24}}
                onPress={() => currentIndex < products.length && setCurrentIndex(currentIndex + 1)}>
                <Image
                    source={require("./images/right.png")}/>
            </TouchableOpacity>
        </GestureRecognizer>

    );
};

const mapStateToProps = (state) => ({
    products: state.ProductsReducer.products
});

export default connect(mapStateToProps)(Products)

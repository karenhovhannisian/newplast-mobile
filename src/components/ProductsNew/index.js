import React, {useState, useRef, useEffect} from 'react';
import {Image, View, Modal, TouchableHighlight, Dimensions, TouchableOpacity,Animated, Easing} from 'react-native';
import Filters from "../Filters";
import styles from "./styles";
import {connect} from "react-redux";
import ProductItem from "../Products/ProductItem";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


const Products2 = ({ products }) => {
    const spinValue = new Animated.Value(0);



    const carousel = useRef(null);
    const [doAnimation, setDoAnimation] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(Dimensions.get('window').width);

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    useEffect(() => {
        Animated.timing(spinValue, {
            toValue: 50,
            easing: Easing.elastic(2),
            duration: 600
        }).start();     }, [currentIndex]);


    const interpolatedRotateAnimation = spinValue.interpolate({
        inputRange: [0, 1,2],
        outputRange: [0,0,0],
        extrapolateLeft: 'identity',
        extrapolateRight: 'clamp'
    });

    return (

        <GestureRecognizer
            onSwipe={()=> console.log("onSwipeUp")}
            onSwipeUp={() => console.log("onSwipeUp")}
            onSwipeDown={() => console.log("onSwipeDown")}
            onSwipeLeft={() => currentIndex < products.length && setCurrentIndex(currentIndex + 1)}
            onSwipeRight={() => currentIndex && setCurrentIndex(currentIndex - 1)}
            config={config}

        >
            <Image style={styles.containerC4Image}
                   source={require("./images/c4.png")}/>
            <TouchableOpacity
                style={{position: 'absolute', top: '40%', left:0, elevation:50}}
                onPress={() => currentIndex && setCurrentIndex(currentIndex - 1)}>
                <Image
                    source={require("./images/left.png")}/>
            </TouchableOpacity>
            <View style={styles.container}>

            <Animated.View style={{
                transform: [{translateX: spinValue},
                    {rotate: interpolatedRotateAnimation}
                ]}
            }>

                <ProductItem currentIndex={currentIndex} product={{item: products[currentIndex], index: currentIndex}}/>

            </Animated.View>
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
                style={{position: 'absolute',top: '40%',  right: 0, elevation:24}}
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

export default connect(mapStateToProps)(Products2)

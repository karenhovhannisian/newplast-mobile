import React from "react";
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import { withNavigation } from 'react-navigation';

const CreateOrderSuccessModal = (props) => {

    return (
            <View style={styles.container}>
                <View >
                    <Image
                        source={require("./images/1.png")}/>
                        <TouchableOpacity  onPress={() => {
                            props.navigation.navigate('Home')
                        }} style={styles.content}>
                            <Image style={styles.imgStyle} source={require('./images/2.png')}/>
                            <Text style={styles.textStyle}>Վերադառնալ Գլխավոր էջ</Text>
                        </TouchableOpacity>
                </View>
            </View>
    )
};

export default withNavigation (CreateOrderSuccessModal);

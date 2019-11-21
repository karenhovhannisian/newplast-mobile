import React from "react";
import {Image, TouchableOpacity, View} from "react-native";
import styles from "./styles";

const Footer = ({navigate}) => {
    return(
        <View style={styles.containers}>
            <TouchableOpacity onPress={() => navigate('Debt')} style={{width: 180, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    source={require('./images/1.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Order')}  style={{width: 180, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    source={require('./images/2.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigate('orderCreate')}  style={{width: 180, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    source={require('./images/3.png')}
                />
            </TouchableOpacity>
        </View>
    )
};

export default Footer

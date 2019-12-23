import React from "react";
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import { withNavigation } from 'react-navigation';

const PermModal = (props) => {

    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.imgStyle}> Անվտանգության նկատառումներից ելնելով՝ խնդրում ենք փոխել Ձեր գաղտնաբառը</Text>
                <TouchableOpacity  onPress={() => {
                    props.setShowModal(false)
                    props.navigation.navigate('orderCreate')
                }} style={styles.content}>

                    <Text style={styles.textStyle}>Վերադառնալ Գլխավոր էջ</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default withNavigation (PermModal);

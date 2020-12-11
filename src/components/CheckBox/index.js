import React from 'react';
import {CheckBox} from "react-native-elements";
import {Text, Image, View} from 'react-native';

const ProductsCheckBox = ({activeTypeIndex, setActiveTypeIndex, availableTypes}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', width: 400, marginTop: 15, marginRight:50}}>
            {availableTypes.map(t =>  <View style={{flexDirection: 'row', alignItems: 'center', width: 70, marginRight: 20}}>
                <Text  onPress={() => {
                    activeTypeIndex === 'Այո' ? setActiveTypeIndex(null) : setActiveTypeIndex('Այո')
                }} style={{fontSize: 20, color: '#161616', fontWeight: 'bold'}}>{t}</Text>
                <CheckBox
                    containerStyle={{width: 30, borderRadius: 28}}
                    checkedIcon={<Image style={{width: 20, height: 20}}
                                        source={require('./images/cheked.png')}/>}
                    uncheckedIcon={<Image style={{width: 20, height: 20}}
                                          source={require("./images/unCheck.png")}/>}
                    checked={activeTypeIndex === t}
                    onPress={() => {
                        activeTypeIndex === t ? setActiveTypeIndex(null) : setActiveTypeIndex(t)
                    }}
                />
            </View>)}
        </View>
    )
};

export default ProductsCheckBox




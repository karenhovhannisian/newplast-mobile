import React, {useState} from 'react';
import {CheckBox} from "react-native-elements";
import {Text, Image, View} from 'react-native';

const ProductsCheckBox = ({activeTypeIndex, setActiveTypeIndex}) => {

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', width: 400, marginTop: 15, marginRight:50}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: 90, marginRight: 20}}>
                <Text  onPress={() => {
                    activeTypeIndex === 'Այո' ? setActiveTypeIndex(null) : setActiveTypeIndex('Այո')
                }} style={{fontSize: 20, color: '#161616', fontWeight: 'bold'}}>Այո</Text>
                <CheckBox
                    containerStyle={{width: 30, borderRadius: 28}}
                    checkedIcon={<Image style={{width: 30, height: 30}}
                                        source={require('./images/cheked.png')}/>}
                    uncheckedIcon={<Image style={{width: 30, height: 30}}
                                          source={require("./images/unCheck.png")}/>}
                    checked={activeTypeIndex === 'Այո'}
                    onPress={() => {
                        activeTypeIndex === 'Այո' ? setActiveTypeIndex(null) : setActiveTypeIndex('Այո')
                    }}
                />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', width: 90, marginRight: 10}}>
                <Text  onPress={() => activeTypeIndex === 'Ոչ' ? setActiveTypeIndex(null) : setActiveTypeIndex('Ոչ')}
                       style={{fontSize: 20, color: '#161616', fontWeight: 'bold'}}>Ոչ</Text>
                <CheckBox
                    containerStyle={{width: 30, borderRadius: 28}}
                    checkedIcon={<Image style={{width: 30, height: 30}}
                                        source={require('./images/cheked.png')}/>}
                    uncheckedIcon={<Image style={{width: 30, height: 30}}
                                          source={require("./images/unCheck.png")}/>}
                    checked={activeTypeIndex === 'Ոչ'}
                    onPress={() => activeTypeIndex === 'Ոչ' ? setActiveTypeIndex(null) : setActiveTypeIndex('Ոչ')}
                />
            </View>
            <View
                  style={{flexDirection: 'row', alignItems: 'center', width: 90, marginRight: 10, }}>
                <Text onPress={() => activeTypeIndex === 'C4' ? setActiveTypeIndex(null) : setActiveTypeIndex('C4')}
                      style={{fontSize: 20, color: '#161616', fontWeight: 'bold'}}>C4</Text>
                <CheckBox
                    containerStyle={{width: 30, borderRadius: 28}}
                    checkedIcon={<Image style={{width: 30, height: 30}}
                                        source={require('./images/cheked.png')}/>}
                    uncheckedIcon={<Image style={{width: 30, height: 30}}
                                          source={require("./images/unCheck.png")}/>}
                    checked={activeTypeIndex === 'C4'}
                    onPress={() => activeTypeIndex === 'C4' ? setActiveTypeIndex(null) : setActiveTypeIndex('C4')}
                />
            </View>
            <View
                  style={{flexDirection: 'row', alignItems: 'center', width: 90 }}>
                <Text onPress={() => activeTypeIndex === 'C5' ? setActiveTypeIndex(null) : setActiveTypeIndex('C5')}
                      style={{fontSize: 20, color: '#161616', fontWeight: 'bold'}}>C5</Text>
                <CheckBox
                    containerStyle={{width: 30, borderRadius: 28}}
                    checkedIcon={<Image style={{width: 30, height: 30}}
                                        source={require('./images/cheked.png')}/>}
                    uncheckedIcon={<Image style={{width: 30, height: 30}}
                                          source={require("./images/unCheck.png")}/>}
                    checked={activeTypeIndex === 'C5'}
                    onPress={() => activeTypeIndex === 'C5' ? setActiveTypeIndex(null) : setActiveTypeIndex('C5')}
                />
            </View>

        </View>

    )
};

export default ProductsCheckBox




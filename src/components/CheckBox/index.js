import React, {useState} from 'react';
import {CheckBox} from "react-native-elements";
import {Text, Image, View} from 'react-native';

const ProductsCheckBox = ({activeTypeIndex, setActiveTypeIndex}) => {

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', width: 400, marginTop: 15, marginRight:50}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: 90, marginRight: 20}}>
                <Text  onPress={() => {
                    activeTypeIndex === 0 ? setActiveTypeIndex(null) : setActiveTypeIndex(0)
                }} style={{fontSize: 20, color: '#161616', fontWeight: 'bold'}}>Այո</Text>
                <CheckBox
                    containerStyle={{width: 30, borderRadius: 28}}
                    checkedIcon={<Image style={{width: 30, height: 30}}
                                        source={require('./images/cheked.png')}/>}
                    uncheckedIcon={<Image style={{width: 30, height: 30}}
                                          source={require("./images/unCheck.png")}/>}
                    checked={activeTypeIndex === 0}
                    onPress={() => {
                        activeTypeIndex === 0 ? setActiveTypeIndex(null) : setActiveTypeIndex(0)
                    }}
                />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', width: 90, marginRight: 10}}>
                <Text  onPress={() => activeTypeIndex === 1 ? setActiveTypeIndex(null) : setActiveTypeIndex(1)}
                       style={{fontSize: 20, color: '#161616', fontWeight: 'bold'}}>Ոչ</Text>
                <CheckBox
                    containerStyle={{width: 30, borderRadius: 28}}
                    checkedIcon={<Image style={{width: 30, height: 30}}
                                        source={require('./images/cheked.png')}/>}
                    uncheckedIcon={<Image style={{width: 30, height: 30}}
                                          source={require("./images/unCheck.png")}/>}
                    checked={activeTypeIndex === 1}
                    onPress={() => activeTypeIndex === 1 ? setActiveTypeIndex(null) : setActiveTypeIndex(1)}
                />
            </View>
            <View
                  style={{flexDirection: 'row', alignItems: 'center', width: 90, marginRight: 10, }}>
                <Text onPress={() => activeTypeIndex === 2 ? setActiveTypeIndex(null) : setActiveTypeIndex(2)}
                      style={{fontSize: 20, color: '#161616', fontWeight: 'bold'}}>C4</Text>
                <CheckBox
                    containerStyle={{width: 30, borderRadius: 28}}
                    checkedIcon={<Image style={{width: 30, height: 30}}
                                        source={require('./images/cheked.png')}/>}
                    uncheckedIcon={<Image style={{width: 30, height: 30}}
                                          source={require("./images/unCheck.png")}/>}
                    checked={activeTypeIndex === 2}
                    onPress={() => activeTypeIndex === 2 ? setActiveTypeIndex(null) : setActiveTypeIndex(2)}
                />
            </View>
            <View
                  style={{flexDirection: 'row', alignItems: 'center', width: 90 }}>
                <Text onPress={() => activeTypeIndex === 3 ? setActiveTypeIndex(null) : setActiveTypeIndex(3)}
                      style={{fontSize: 20, color: '#161616', fontWeight: 'bold'}}>C5</Text>
                <CheckBox
                    containerStyle={{width: 30, borderRadius: 28}}
                    checkedIcon={<Image style={{width: 30, height: 30}}
                                        source={require('./images/cheked.png')}/>}
                    uncheckedIcon={<Image style={{width: 30, height: 30}}
                                          source={require("./images/unCheck.png")}/>}
                    checked={activeTypeIndex === 3}
                    onPress={() => activeTypeIndex === 3 ? setActiveTypeIndex(null) : setActiveTypeIndex(3)}
                />
            </View>

        </View>

    )
};

export default ProductsCheckBox




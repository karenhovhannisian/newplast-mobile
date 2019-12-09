import React from "react";
import {Image, TouchableOpacity, View,Text} from "react-native";
import styles from "./styles";

const Footer = ({navigate,navigates}) => {
    return(
        <View style={styles.containers}>
            <TouchableOpacity onPress={() => navigate('Order')}  style={{width: 250, alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                <Image
                    source={require('./images/2.png')}
                />
                <Text style={{color: 'white', fontSize:18, marginLeft:'3%'}}>Նախկին պատվերներ</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigate('orderCreate')}  style={{width: 180, alignItems: 'center', justifyContent: 'center',flexDirection:'row', marginLeft:'10%'}}>

                        <Image
                            source={require('./images/3.png')}
                        />
                <Text style={{color: 'white', fontSize:18, marginLeft:'3%'}}>Ստեղծել պատվեր</Text>
                {navigates.state.routeName === 'orderCreate' ?  <Image style={{ width:25, position:'absolute', top:54}}
                    source={require('./images/55.png')}
                />: null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Debt')} style={{width: 180, alignItems: 'center', justifyContent: 'center',flexDirection:'row',marginLeft:'10%'}}>
                <Image
                    source={require('./images/1.png')}
                />
                <Text style={{color: 'white', fontSize:18, marginLeft:'3%'}}>Պարտք</Text>
                {navigates.state.routeName === 'Debt' ? <View style={{height:3, backgroundColor:'white',borderRadius:15, width:80,right:35, position:'absolute', top:50}}/>: null}

            </TouchableOpacity>
        </View>
    )
};

export default Footer

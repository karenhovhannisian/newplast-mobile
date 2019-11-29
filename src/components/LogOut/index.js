import React from "react";
import {Image, Modal, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {attemptLogOut} from "../../redux/actions";
import cache from '../../Common/Cache';

const LogOut = ({showModal, attemptLogOut, navigation}) => {

    const {navigate} = navigation;
    const attemptLogOu = () => {
        attemptLogOut()
    };

    const clearCache =() => {
        cache.clearAll( function(err) {
            console.log(err,'error')
        });
        navigate('Login');
        attemptLogOu()
    }

    return (
            <Modal
                // animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={{backgroundColor: '#F7F7F9', width: '100%', height:80,borderBottomLeftRadius: 30,borderBottomRightRadius:30,flexDirection: 'row', justifyContent: 'center',position:'relative'}}>
                  <TouchableOpacity style={{flexDirection: 'row',}} onPress={clearCache}>
                    <Text style={{flexDirection: 'row', justifyContent: 'center', textAlign: 'center', marginTop: 20, fontSize: 25, fontWeight: 'bold', color: '#072C7D'}}>Դուրս գալ</Text>
                    <Image
                        style={{ alignItems: 'center', marginTop: 30,marginLeft: 20}}
                           source={require("./images/logout.png")}/>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={attemptLogOu} style={{position: 'absolute',width:50,height:80, right: 30, alignItems: 'center', marginTop: 30, zIndex:99999}} >
                           <Image
                           source={require("./images/cancel.png")}/>
                </TouchableOpacity>
            </Modal>

    )
};


const mapStateToProps = (state) => ({
    showModal: state.AuthReducer.showModal,
});

const mapDispatchToProps = (dispatch) => ({
    attemptLogOut: () => dispatch(attemptLogOut())
});

export default connect(mapStateToProps, mapDispatchToProps) (LogOut)

import React, {useEffect, useState} from 'react';
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions,
    Animated,
    Easing
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {attemptSignIn} from "../../redux/actions";
import cache from "../../Common/Cache";

const Login = (props) => {
    const [User, onChangeText] = useState('WKaren');
    const [loader, setLoader] = useState(false);
    const [pass, onChangePassword] = useState('wkaren');
    const {navigate} = props.navigation;

    const handleSubmitPassword = () => {
        props.signIn(User, pass);
        navigate('Home')

    };
    const onLayout = (e) => {

    };

    useEffect(() => {
        spin();
        setTimeout(() => {
            setLoader(true)
        }, 2000)
    },[]);

    useEffect(() => {
        cache.getItem("login", function (err, value) {
            if (value) {
                navigate('Home')
            }
        });
    });

    const spin = () => {
        spinValue.setValue(0)
        Animated.timing(
            spinValue,
            {
                toValue: 2,
                duration: 5500,
                easing: Easing.linear
            }
        ).start(() => spin())
    }

    const spinValue = new Animated.Value(0)



    const spins = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })



    return (
        <>
            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                <ImageBackground source={require("./images/Login.png")}
                                 style={{
                                     width: '100%',
                                     height: '100%',
                                     alignItems: 'center',
                                     justifyContent: 'center',
                                 }}>
                    {!loader ? <View style={styles.animatedLoader}>
                    <Animated.Image
                        style={{
                            width: 200,
                            height: 70,
                            transform: [{rotate: spins}]
                        }}
                        source={require('./images/log.png')}
                    />
                </View>:
                <View>
                    <Image style={{width: 110, marginBottom: 40, marginLeft:'20%'}}
                           source={require('./images/Group.png')}
                    />

                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{
                            fontSize: 45,
                            justifyContent: 'center',
                            color: 'white',
                        }}>ՄՈՒՏՔ</Text>
                    </View>
                    <View onLayout={onLayout} style={styles.sectionContainer}>
                        <TextInput
                            placeholder='Անուն'
                            style={styles.loginInput}
                            onChangeText={text => onChangeText(text)}
                            value={User}
                        />
                        <TextInput
                            placeholder='Գաղտնաբառ'
                            style={styles.passwordInput}
                            onChangeText={text => onChangePassword(text)}
                            value={pass}
                        />
                        <View onPress={handleSubmitPassword} style={styles.sectionTitle}>
                            <TouchableOpacity onPress={handleSubmitPassword}>
                                <Image
                                    source={require('./images/right-arrow.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>}
                </ImageBackground>
            </View>
        </>
    );
};

const mapStateToProps = (state) => ({
    User: state.AuthReducer.User,
    Pass: state.AuthReducer.Pass,
});

const mapDispatchToProps = (dispatch) => ({
    signIn: (User, pass) => dispatch(attemptSignIn(User, pass))
});


export default connect(mapStateToProps, mapDispatchToProps)(Login)

import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  Easing,
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {attemptSignIn} from '../../redux/actions';
import cache from '../../Common/Cache';
import Home from '../Home';

const Login = props => {
  const [User, onChangeText] = useState('');
  const [loader, setLoader] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [pass, onChangePassword] = useState('');
  const {navigate} = props.navigation;
  const handleSubmitPassword = () => {
    if (User === '') {
      setLoginErrorMessage(true);
    } else if (pass === '') {
      setPasswordErrorMessage(true);
    } else if (User === '' && pass === '') {
      setLoginErrorMessage(true);
      setPasswordErrorMessage(true);
    } else {
      setLoginErrorMessage(false);
      setPasswordErrorMessage(false);
      props.signIn(User, pass);
    }
  };
  const onLayout = e => {};

  useEffect(() => {
    spin();
    setTimeout(() => {
      setLoader(true);
    }, 2000);
  }, []);

  useEffect(() => {
    cache.getItem('login', function(err, value) {
      if (!props.showFailMessage && value) {
        navigate('Home');
      }
    });
  }, [props.showFailMessage]);

  useEffect(() => {}, [props.navigation.state.routeName]);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 2,
      duration: 5500,
      easing: Easing.linear,
    }).start(() => spin());
  };

  const spinValue = new Animated.Value(0);

  const spins = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <ImageBackground
          source={require('./images/Login.png')}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {!loader ? (
            <View style={styles.animatedLoader}>
              <Animated.Image
                style={{
                  width: 200,
                  height: 70,
                  transform: [{rotate: spins}],
                }}
                source={require('./images/log.png')}
              />
            </View>
          ) : (
            <View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{width: 110, marginBottom: 40, marginLeft: '1%'}}
                  source={require('./images/Group.png')}
                />
              </View>

              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 45,
                    justifyContent: 'center',
                    color: 'white',
                  }}>
                  ՄՈՒՏՔ
                </Text>
              </View>

              <View onLayout={onLayout} style={styles.sectionContainer}>
                <TextInput
                  placeholder="Անուն"
                  onBlur={() => setLoginErrorMessage(false)}
                  style={
                    loginErrorMessage
                      ? styles.loginInputError
                      : styles.loginInput
                  }
                  onChangeText={text => onChangeText(text)}
                  // value={User}
                />
                <TextInput
                  placeholder="Գաղտնաբառ"
                  onBlur={() => setPasswordErrorMessage(false)}
                  style={
                    passwordErrorMessage
                      ? styles.passwordInputError
                      : styles.passwordInput
                  }
                  secureTextEntry={true}
                  onChangeText={text => onChangePassword(text)}
                  // value={pass}
                />
                {props.showFailMessage ? (
                  <Text style={styles.errorMessage}>
                    Ներեցեք,Դուք չունեք օգտվելու իրավասություն
                  </Text>
                ) : null}
                <View
                  onPress={handleSubmitPassword}
                  style={styles.sectionTitle}>
                  <TouchableOpacity onPress={handleSubmitPassword}>
                    <Image source={require('./images/right-arrow.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ImageBackground>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  User: state.AuthReducer.User,
  Pass: state.AuthReducer.Pass,
  showFailMessage: state.AuthReducer.showFailMessage,
});

const mapDispatchToProps = dispatch => ({
  signIn: (User, pass) => dispatch(attemptSignIn(User, pass)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

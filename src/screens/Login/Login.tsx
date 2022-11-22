import React, { FC, useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Background from '../../assets/images/AuthBackground.png';
import Logo from '../../assets/images/logo.png';
import { Text } from '../../components';
import { LogInFormData } from '../../models/auth';
import { useAppDispatch } from '../../store';
import { signIn } from '../../store/auth/thunks';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

interface Props {}

export const Login: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const [showFailMessage, setShowFailMessage] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormData>();

  const onSubmit: SubmitHandler<LogInFormData> = useCallback(
    async data => {
      const res = await dispatch(signIn(data));
      if (res.type.includes('rejected')) {
        setShowFailMessage(true);
      }
    },
    [dispatch],
  );

  return (
    <ImageBackground source={Background} style={styles.background} resizeMode="stretch">
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          style={styles.keyboardWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Image style={styles.logo} source={Logo} resizeMode="contain" />
          <Text fontSize={72} style={styles.title}>
            Մուտք
          </Text>
          <View style={styles.sectionContainer}>
            {errors.username || errors.password || showFailMessage ? (
              <Text style={styles.errorMessage}>
                {errors.username?.message ||
                  errors.password?.message ||
                  'Ներեցեք,Դուք չունեք օգտվելու իրավասություն'}
              </Text>
            ) : null}
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'Անուն դաշտը պետք է լրացված լինի',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Անուն"
                  onBlur={onBlur}
                  style={[styles.input, errors.username && styles.inputError]}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Գաղտնաբառ դաշտը պետք է լրացված լինի',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Գաղտնաբառ"
                  onBlur={onBlur}
                  style={[styles.input, styles.lastInput, errors.password && styles.inputError]}
                  secureTextEntry={true}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
              <Text fontSize={40} style={styles.buttonTitle}>
                ՄՈՒՏՔ
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  keyboardWrapper: {
    flex: 1,
    paddingTop: verticalScale(220),
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
  },
  logo: { width: horizontalScale(180) },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
    letterSpacing: 1,
    paddingBottom: 30,
  },
  sectionContainer: {
    backgroundColor: '#ffffff',
    width: '60%',
    paddingHorizontal: horizontalScale(72),
    paddingVertical: verticalScale(64),
    borderRadius: moderateScale(25),
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 25,
  },

  submitButton: {
    position: 'absolute',
    bottom: -verticalScale(30),
    paddingHorizontal: horizontalScale(140),
    paddingVertical: verticalScale(8),
    backgroundColor: '#2e86de',
    borderRadius: moderateScale(12),
  },

  buttonTitle: {
    color: '#ffffff',
    textAlign: 'center',
  },

  input: {
    width: '100%',
    minHeight: verticalScale(64),
    paddingHorizontal: horizontalScale(48),
    color: 'black',
    fontSize: moderateScale(20),
    borderColor: '#F2F2F2',
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: moderateScale(25),
  },
  lastInput: {
    marginTop: verticalScale(30),
  },
  inputError: {
    borderColor: 'red',
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 25,
  },
  errorMessage: {
    position: 'absolute',
    top: verticalScale(8),
    left: horizontalScale(72),
    fontSize: 18,
    color: 'red',
  },
});

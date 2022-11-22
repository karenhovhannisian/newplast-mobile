import React, { useCallback } from 'react';
import { Image, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import CancelIcon from '../assets/images/cancel.png';
import LogOutIcon from '../assets/images/logout.png';
import { useAppDispatch, useAppSelector } from '../store';
import { getIsShowModal } from '../store/auth/selectors';
import { attemptLogOut, attemptLogOutSuccess, authLogOut } from '../store/auth/slice';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale';
import Text from './Text';

const LogOut = () => {
  const showModal = useAppSelector(getIsShowModal);
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(() => {
    dispatch(attemptLogOutSuccess());
  }, [dispatch]);

  const clearCache = useCallback(() => {
    dispatch(authLogOut());
    dispatch(attemptLogOut());
    dispatch(attemptLogOutSuccess());
  }, [dispatch]);

  const onRequestClose = useCallback(() => {
    dispatch(attemptLogOutSuccess());
  }, [dispatch]);

  return (
    <Modal transparent={true} visible={showModal} onRequestClose={onRequestClose}>
      <Pressable style={styles.modal} onPress={onRequestClose}>
        <View style={styles.base}>
          <TouchableOpacity style={styles.logOut} onPress={clearCache}>
            <Text fontSize={36} style={styles.logOutText}>
              Դուրս գալ
            </Text>
            <Image source={LogOutIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSuccess} style={styles.cancel}>
            <Image source={CancelIcon} />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.67)',
  },
  base: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F9',
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    height: verticalScale(80),
  },
  logOut: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logOutText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#072C7D',
    paddingRight: 20,
  },
  cancel: {
    position: 'absolute',
    right: horizontalScale(30),
    height: '100%',
    justifyContent: 'center',
  },
});

export default LogOut;

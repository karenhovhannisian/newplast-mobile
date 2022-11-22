import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddOrder from '../../assets/images/AddOrder.png';
import Debts from '../../assets/images/Debts.png';
import HomeBackground from '../../assets/images/HomeBackground.png';
import Order from '../../assets/images/Order.png';
import PreviousOrders from '../../assets/images/PreviousOrders.png';
import ThreeDot from '../../assets/images/threeDot.png';
import { HeaderButton, LogOut, PermModal, Text } from '../../components';
import { MainNavigatorProp } from '../../navigation/MainNavigator';
import { useAppDispatch, useAppSelector } from '../../store';
import { getMnor } from '../../store/auth/selectors';
import { attemptLogOutSuccess } from '../../store/auth/slice';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/scale';

export const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation<MainNavigatorProp>();
  const mnor = useAppSelector(getMnor);
  const [showModal, setShowModal] = useState(false);
  // const permissions = useSelector(getPermissions);

  useEffect(() => {
    if (Number(mnor) <= 7) {
      setShowModal(true);
    }
  }, [mnor]);

  const onNavigateProducts = useCallback(
    () => navigate.navigate('TabNavigation', { screen: 'CreateOrder' }),
    [navigate],
  );
  const onNavigateOldOrders = useCallback(
    () => navigate.navigate('TabNavigation', { screen: 'PreviousOrder' }),
    [navigate],
  );
  const onNavigateDebts = useCallback(
    () => navigate.navigate('TabNavigation', { screen: 'Debts' }),
    [navigate],
  );
  const onNavigateOrders = useCallback(
    () => navigate.navigate('TabNavigation', { screen: 'Orders' }),
    [navigate],
  );

  // const searchPermission = useMemo(
  //   () => permissions && permissions.includes('find'),
  //   [permissions],
  // );

  const changeModalState = useCallback(() => {
    dispatch(attemptLogOutSuccess());
  }, [dispatch]);

  return (
    <ImageBackground source={HomeBackground} style={styles.base}>
      <View style={styles.threeDotMenu}>
        <HeaderButton onPress={changeModalState} image={ThreeDot} />
      </View>

      <View style={styles.titleContainer}>
        <Text fontSize={60} style={styles.text}>
          Բարի Գալուստ
        </Text>
        <Text fontSize={35} style={styles.text}>
          NewPlast կառավարման համակարգ
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.containerItem} onPress={onNavigateOldOrders}>
          <Image style={styles.containerImage} source={PreviousOrders} resizeMode="contain" />
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.containerItem} onPress={onNavigateProducts}>
            <Image style={styles.containerImage} source={AddOrder} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.containerItem]} onPress={onNavigateOrders}>
            <Image style={styles.containerImage} source={Order} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.containerItem} onPress={onNavigateDebts}>
          <Image style={styles.containerImage} source={Debts} resizeMode="contain" />
        </TouchableOpacity>

        <LogOut />
        <Modal transparent={true} visible={showModal}>
          <PermModal setShowModal={setShowModal} />
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  threeDotMenu: {
    position: 'absolute',
    right: horizontalScale(30),
    top: verticalScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  titleContainer: {
    width: '100%',
    marginTop: verticalScale(40),
    paddingLeft: horizontalScale(50),
  },
  text: {
    color: 'white',
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: verticalScale(70),
    paddingHorizontal: horizontalScale(230),
  },

  containerItem: {
    elevation: 24,
    borderRadius: moderateScale(26),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: verticalScale(260),
    height: verticalScale(260),
    marginTop: verticalScale(160),
    backgroundColor: '#f8f8ff',
    transform: [{ rotate: '45deg' }],
  },

  containers: {
    flex: 1,
    justifyContent: 'center',
  },
  containerImage: {
    transform: [{ rotate: '-45deg' }],
    width: verticalScale(180),
    marginLeft: -10,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: horizontalScale(10),
  },
});

export default styles;

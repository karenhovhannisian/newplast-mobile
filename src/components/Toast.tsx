import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { horizontalScale, verticalScale } from '../utils/scale';
import Text from './Text';

const toastConfig: ToastConfig = {
  success: ({ text1 }) => (
    <View style={[styles.base, styles.success]}>
      <Text style={styles.text} fontSize={28}>
        {text1}
      </Text>
    </View>
  ),
  error: ({ text1 }) => (
    <View style={styles.base}>
      <Text style={styles.text} fontSize={16}>
        {text1}
      </Text>
    </View>
  ),
};

export const InAppMessage = () => {
  const insets = useSafeAreaInsets();
  return (
    <Toast config={toastConfig} position={'top'} topOffset={insets.top} visibilityTime={4000} />
  );
};

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(48),
    paddingVertical: verticalScale(32),
    width: '100%',
    backgroundColor: '#ee3032',
    zIndex: 200,
  },
  success: {
    backgroundColor: '#53a653',
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

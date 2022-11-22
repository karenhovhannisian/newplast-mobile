import React, { FC, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  setShowModal: (value: boolean) => void;
}

const PermModal: FC<Props> = memo(({ setShowModal }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.imgStyle}>
          Անվտանգության նկատառումներից ելնելով՝ խնդրում ենք փոխել Ձեր գաղտնաբառը
        </Text>
        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.content}>
          <Text style={styles.textStyle}>Վերադառնալ Գլխավոր էջ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F7F7F9',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'blue',
  },
  imgStyle: {
    fontSize: 25,
    marginRight: 20,
    marginTop: 7,
    marginBottom: '5%',
  },
});

export default PermModal;

import React, {useState} from 'react';
import {Image, Modal, TouchableOpacity} from 'react-native';
import styles from '../ProductsNew/styles';
import Filters from '../Filters';

const ProductFilter = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.modalVisible}>
        <Image
          style={{width: 80, height: 80}}
          source={require('./images/filter.png')}
        />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <Filters />
        <TouchableOpacity
          style={styles.modalVisibleClose}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Image
            style={{width: 25, height: 25}}
            source={require('./images/close.png')}
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default ProductFilter;

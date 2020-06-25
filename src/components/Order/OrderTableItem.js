import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, Modal} from 'react-native';
import styles from './styles';
import {TableWrapper} from 'react-native-table-component';
import OrderHistory from '../OrderHistory';
import {connect} from 'react-redux';
import {getOldOrders} from '../../redux/actions';

const OrderTableItem = ({oldOrders, rowData, index}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderData, setOrderData] = useState(oldOrders);
  const [orderDataIndex, setOrderDataIndex] = useState(null);

  const _alertIndex = index => {
    setOrderDataIndex(index);
    setModalVisible(true);
  };

  const element = index => (
    <TouchableOpacity onPress={() => _alertIndex(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Տեսնել ավելին</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <TableWrapper key={index} style={styles.row}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            margin: 0,
          }}>
          <Text style={styles.textss}>{rowData.gyanun}</Text>
          <Text style={styles.texts}>{rowData.gycod}</Text>
          <Text style={styles.texts}>{rowData.sdate}</Text>
          <Text style={styles.texts}>{rowData.patcod}</Text>
          {element(index)}
        </View>
      </TableWrapper>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <OrderHistory ordersData={orderData[orderDataIndex]} />
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#072C7D',
            position: 'absolute',
            right: 10,
            top: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
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

const mapStateToProps = state => ({
  oldOrders: state.OrdersReducer.oldOrders,
});

const mapDispatchToProps = dispatch => ({
  getOldOrders: () => dispatch(getOldOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderTableItem);

import React, { FC, memo } from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IProduct } from '../models/product';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale';
import Text from './Text';

interface Props {
  items: Array<IProduct>;
  itemWidth: number;
  onSelect: (item: IProduct) => void;
}

const ProductListItem: FC<Props> = memo(({ items, itemWidth, onSelect }) => {
  return (
    <Pressable style={{ width: itemWidth }}>
      <View style={styles.root}>
        {items?.map(item => (
          <View style={styles.base} key={item.products_id}>
            <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
              <Image
                source={{ uri: item.products_image }}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.nameContainer}>
                <Text fontSize={14} style={styles.name} numberOfLines={2}>
                  {item.pxumb_name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Pressable>
  );
});

export default ProductListItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  base: {
    justifyContent: 'center',
    padding: verticalScale(8),
  },
  item: {
    width: moderateScale(280),
    height: moderateScale(248),
    borderRadius: moderateScale(20),
    backgroundColor: '#ffffff',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,
    elevation: 8,
  },
  image: {
    height: '80%',
    borderRadius: moderateScale(20),
    backgroundColor: '#ffffff',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(12),
  },
  name: {
    fontWeight: '700',
  },
});

import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../utils/scale';
import Text from './Text';

interface Props {
  id: any;
  items: Array<any>;
  isHeader?: boolean;
  buttonTitle?: string;
  status?: boolean;
  onButtonPress?: () => void;
  onPress?: () => void;
}

const TableItem: FC<Props> = ({
  items,
  isHeader = false,
  buttonTitle,
  status,
  onButtonPress,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={!onPress}
    style={[styles.base, isHeader ? styles.header : undefined]}>
    {items.map((item, index) => (
      <View
        key={index.toString()}
        style={[
          isHeader ? styles.generalHeader : styles.general,
          index === 0 ? styles.firstItem : styles.item,
        ]}>
        {index === items.length - 1 && buttonTitle ? (
          <TouchableOpacity onPress={onButtonPress} style={styles.moreButton}>
            <Text fontSize={16} style={styles.buttonTitle}>
              {`${buttonTitle} ${status ? ' ✔️' : ''}`}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            fontSize={18}
            style={[
              styles.content,
              isHeader && styles.headerContent,
              index === 0 && styles.headerContent,
            ]}>
            {item || (!isHeader && '-')}
          </Text>
        )}
      </View>
    ))}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  header: {
    backgroundColor: '#d2d8e6',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ced5e3',
  },
  firstItem: {
    width: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ced5e3',
  },
  general: {
    paddingVertical: verticalScale(15),
  },
  generalHeader: {
    paddingVertical: verticalScale(10),
  },

  lastItem: {
    width: '100%',
  },
  content: {
    textAlign: 'center',
    fontWeight: '700',
  },
  headerContent: {
    color: '#00276E',
    fontWeight: '700',
  },
  moreButton: {
    flexDirection: 'row',
    backgroundColor: '#ff0f3b',
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    minWidth: horizontalScale(240),
    borderRadius: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default memo(TableItem);

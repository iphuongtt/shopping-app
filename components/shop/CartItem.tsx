import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {ViewProps} from '../../interfaces';

interface Props extends ViewProps {
  onRemove: Function;
  quantity: number;
  title: string;
  amount: number;
}

export const CartItem = (props: Props) => {
  const onRemoveHandler = () => {
    props.onRemove();
  };
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={onRemoveHandler} style={styles.deleteButton}>
          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  deleteButton: {
    marginLeft: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'OpenSans-Regular',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  amount: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
});

export default CartItem;

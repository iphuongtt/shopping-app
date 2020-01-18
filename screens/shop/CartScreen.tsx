import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {useTypedSelector} from '../../store/reducers';
//import {CartItem} from '../../models';

export const CartScreen = () => {
  const cartTotal = useTypedSelector(state => state.cart.totalAmount);
  const cartItems = useTypedSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        sum: state.cart.items[key].sum,
        quanity: state.cart.items[key].quanity,
      });
    }
    return transformedCartItems;
  });
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotal}</Text>
        </Text>
        <Button
          title="Order Now"
          onPress={() => {}}
          disabled={cartItems.length === 0}
        />
      </View>
      <View>
        <Text>CART ITEMS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {},
  amount: {},
});

export default CartScreen;

import React from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {NavigationStackScreenComponent} from 'react-navigation-stack';

import {useTypedSelector} from '../../store/reducers';
import {removeFromCart, addOrder} from '../../store/actions';
import {CartItem} from '../../components/shop';
import {CartItem as CartItemModel} from '../../models';
import {Card} from '../../components/UI';

export const CartScreen: NavigationStackScreenComponent = props => {
  const dispatch = useDispatch();
  const cartTotal = useTypedSelector(state => state.cart.totalAmount);
  const cartItems: CartItemModel[] = useTypedSelector(state => {
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
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1,
    );
  });
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(+cartTotal.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title="Order Now"
          onPress={() => {
            dispatch(addOrder(cartItems, cartTotal));
            props.navigation.navigate('Order');
          }}
          disabled={cartItems.length === 0}
        />
      </Card>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartItem
              title={itemData.item.productTitle}
              quantity={itemData.item.quanity}
              amount={itemData.item.sum}
              deleteAble={true}
              onRemove={() => {
                dispatch(removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
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
  },
  summaryText: {},
  amount: {},
});

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

export default CartScreen;

import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {ViewProps} from '../../interfaces';
import CartItem from './CartItem';
import {colors} from '../../constants';
import {CartItem as CartItemModel} from '../../models';
import {Card} from '../UI';

interface Props extends ViewProps {
  amount: number;
  date: string;
  items: CartItemModel[];
}

export const OrderItem = (props: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails(preState => !preState);
        }}
        color={colors.primary}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map(cartItem => (
            <CartItem
              title={cartItem.productTitle}
              quantity={cartItem.quanity}
              amount={cartItem.sum}
              onRemove={() => {}}
              deleteAble={false}
              key={cartItem.productId}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  amount: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});

export default OrderItem;

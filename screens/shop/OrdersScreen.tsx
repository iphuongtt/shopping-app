import React from 'react';
import {FlatList, Platform} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {useTypedSelector} from '../../store/reducers';
import {CustomHeaderButton} from '../../components/UI';
import {OrderItem} from '../../components/shop';

export const OrdersScreen: NavigationStackScreenComponent = () => {
  const orders = useTypedSelector(state => state.orders.orders);
  return (
    <FlatList
      data={orders}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      );
    },
  };
};

export default OrdersScreen;

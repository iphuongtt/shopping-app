import React from 'react';
import {Text, FlatList, Platform} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {useTypedSelector} from '../../store/reducers';
import {CustomHeaderButton} from '../../components/UI';

export const OrdersScreen: NavigationStackScreenComponent = () => {
  const orders = useTypedSelector(state => state.orders.orders);
  return (
    <FlatList
      data={orders}
      renderItem={itemData => (
        <Text>{`${itemData.item.id} ${itemData.item.totalAmount}`}</Text>
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

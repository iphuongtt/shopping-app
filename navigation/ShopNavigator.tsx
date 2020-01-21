import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../constants';
import {
  ProductsOverviewScreen,
  ProductDetailScreen,
  CartScreen,
  OrdersScreen,
} from '../screens/shop';

import {UserProductsScreen, EditProductScreen} from '../screens/user';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
  },
  headerTitleBackStyle: {
    fontFamily: 'OpenSans',
  },
};

const ProductsStackNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    initialRouteName: 'ProductsOverview',
    defaultNavigationOptions: defaultStackNavOptions,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Icon
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={tintColor}
        />
      ),
    },
  },
);

const OrderStackNavigator = createStackNavigator(
  {
    Order: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Icon
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={tintColor}
        />
      ),
    },
  },
);

const AdminStackNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
    navigationOptions: {
      drawerIcon: ({tintColor}) => (
        <Icon
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={tintColor}
        />
      ),
    },
  },
);

const MainNavigator = createDrawerNavigator(
  {
    Orders: OrderStackNavigator,
    Products: ProductsStackNavigator,
    Admin: AdminStackNavigator,
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
    },
  },
);

export const ShopsNavigator = createAppContainer(MainNavigator);

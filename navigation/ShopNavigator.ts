import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';

import {colors} from '../constants';
import {
  ProductsOverviewScreen,
  ProductDetailScreen,
  CartScreen,
  OrdersScreen,
} from '../screens/shop';

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
    navigationOptions: {},
  },
);

const OrderStackNavigator = createStackNavigator(
  {
    Order: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const MainNavigator = createDrawerNavigator(
  {
    Orders: OrderStackNavigator,
    Products: ProductsStackNavigator,
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
    },
  },
);

export const ShopsNavigator = createAppContainer(MainNavigator);

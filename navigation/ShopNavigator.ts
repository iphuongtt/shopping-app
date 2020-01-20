import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';

import {colors} from '../constants';
import {
  ProductsOverviewScreen,
  ProductDetailScreen,
  CartScreen,
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
  },
);

export const ShopsNavigator = createAppContainer(ProductsStackNavigator);

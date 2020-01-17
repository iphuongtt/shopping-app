import React from 'react';
import {View, Text} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';

import {useTypedSelector} from '../../store/reducers';

export const ProductDetailScreen: NavigationStackScreenComponent = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useTypedSelector(state =>
    state.products.availableProducts.find(product => product.id === productId),
  );
  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: navigation.getParam('productTitle'),
  };
};

export default ProductDetailScreen;

import React from 'react';
import {FlatList, Text} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';

import {useTypedSelector} from '../../store/reducers';

export const ProductsOverviewScreen: NavigationStackScreenComponent = () => {
  const products = useTypedSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={itemData => <Text>{itemData.item.title}</Text>}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductsOverviewScreen;

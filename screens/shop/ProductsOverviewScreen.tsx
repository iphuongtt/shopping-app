import React from 'react';
import {FlatList} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';

import {useTypedSelector} from '../../store/reducers';
import {ProductItem} from '../../components/shop';

export const ProductsOverviewScreen: NavigationStackScreenComponent = () => {
  const products = useTypedSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductsOverviewScreen;

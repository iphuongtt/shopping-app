import React from 'react';
import {FlatList} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';

import {useTypedSelector} from '../../store/reducers';
import {ProductItem} from '../../components/shop';

export const ProductsOverviewScreen: NavigationStackScreenComponent = props => {
  const products = useTypedSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate({
              routeName: 'ProductDetail',
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              },
            });
          }}
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

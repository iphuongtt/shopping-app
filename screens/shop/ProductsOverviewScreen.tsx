import React from 'react';
import {FlatList, Platform, Button} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {useTypedSelector} from '../../store/reducers';
import {addToCart} from '../../store/actions';
import {ProductItem} from '../../components/shop';
import {CustomHeaderButton as HeaderButton} from '../../components/UI';
import {colors} from '../../constants';

export const ProductsOverviewScreen: NavigationStackScreenComponent = props => {
  const products = useTypedSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const handleViewDetail = itemData => {
    props.navigation.navigate({
      routeName: 'ProductDetail',
      params: {
        productId: itemData.item.id,
        productTitle: itemData.item.title,
      },
    });
  };

  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => handleViewDetail(itemData)}>
          <Button
            color={colors.primary}
            title="View Details"
            onPress={() => handleViewDetail(itemData)}
          />
          <Button
            color={colors.primary}
            title="To Cart"
            onPress={() => dispatch(addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'All Products',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add To Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
        </HeaderButtons>
      );
    },
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
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

export default ProductsOverviewScreen;

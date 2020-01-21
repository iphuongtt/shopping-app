import React from 'react';
import {FlatList, Platform} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {ProductItem} from '../../components/shop';
import {useTypedSelector} from '../../store/reducers';
import {CustomHeaderButton} from '../../components/UI';

export const UserProductsScreen: NavigationStackScreenComponent = () => {
  const userProducts = useTypedSelector(state => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
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

UserProductsScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Your Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};
export default UserProductsScreen;

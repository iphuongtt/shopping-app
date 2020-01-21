import React from 'react';
import {useDispatch} from 'react-redux';
import {FlatList, Button, Platform} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {ProductItem} from '../../components/shop';
import {useTypedSelector} from '../../store/reducers';
import {deleteProduct} from '../../store/actions';
import {CustomHeaderButton} from '../../components/UI';
import {colors} from '../../constants';
import {Product} from '../../models';
import {PropType} from '../../types';

export const UserProductsScreen: NavigationStackScreenComponent = () => {
  const userProducts = useTypedSelector(state => state.products.userProducts);
  const handleSelectItem = (itemData: Product) => {
    console.log(itemData);
  };
  const handleEditItem = (productId: PropType<Product, 'id'>) => {
    console.log(productId);
  };

  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProducts}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => handleSelectItem(itemData.item)}>
          <Button
            color={colors.primary}
            title="Edit"
            onPress={() => handleEditItem(itemData.item.id)}
          />
          <Button
            color={colors.primary}
            title="Delete"
            onPress={() => dispatch(deleteProduct(itemData.item.id))}
          />
        </ProductItem>
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

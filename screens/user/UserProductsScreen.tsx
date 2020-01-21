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

export const UserProductsScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const userProducts = useTypedSelector(state => state.products.userProducts);
  const handleSelectProduct = (itemData: Product) => {
    navigation.navigate('EditProduct', {
      productId: itemData.id,
      title: itemData.title,
    });
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
          onSelect={() => handleSelectProduct(itemData.item)}>
          <Button
            color={colors.primary}
            title="Edit"
            onPress={() => handleSelectProduct(itemData.item)}
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

import React from 'react';
import {View, Text, ScrollView, Image, Button, StyleSheet} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';

import {useTypedSelector} from '../../store/reducers';
import {colors} from '../../constants';

export const ProductDetailScreen: NavigationStackScreenComponent = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useTypedSelector(state =>
    state.products.availableProducts.find(product => product.id === productId),
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <View style={styles.actions}>
        <Button color={colors.primary} title="Add To Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  button: {},
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default ProductDetailScreen;

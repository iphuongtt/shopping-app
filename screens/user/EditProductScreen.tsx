import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {CustomHeaderButton} from '../../components/UI';
import {Product} from '../../models';
import {useTypedSelector} from '../../store/reducers';

export const EditProductScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const prodId = navigation.getParam('productId');
  const editedProduct = useTypedSelector(state =>
    state.products.userProducts.find(product => product.id === prodId),
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageURL, setImageURL] = useState(
    editedProduct ? editedProduct.imageUrl : '',
  );
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : '',
  );

  const handleSave = useCallback(() => {
    const product = new Product('', '', title, imageURL, description, price);
    console.log(product);
  }, [title, imageURL, price, description]);

  useEffect(() => {
    navigation.setParams({handleSave});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSave]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageURL}
            onChangeText={text => setImageURL(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={editedProduct.price.toString()}
              onChangeText={text => setPrice(Number(text))}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'OpenSans-Bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  formControl: {width: '100%'},
  form: {margin: 20},
});

EditProductScreen.navigationOptions = ({navigation}) => {
  const title = navigation.getParam('productId')
    ? 'Edit Product'
    : 'Add Product';
  return {
    headerTitle: title,
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={() => navigation.getParam('handleSave')()}
          />
        </HeaderButtons>
      );
    },
  };
};

export default EditProductScreen;

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux';

import {CustomHeaderButton} from '../../components/UI';
import {useTypedSelector} from '../../store/reducers';
import {createProduct, updateProduct} from '../../store/actions';

export const EditProductScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const prodId = navigation.getParam('productId');
  const editedProduct = useTypedSelector(state =>
    state.products.userProducts.find(product => product.id === prodId),
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [imageURL, setImageURL] = useState(
    editedProduct ? editedProduct.imageUrl : '',
  );
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : '',
  );

  const dispatch = useDispatch();

  const handleSave = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (prodId) {
      dispatch(updateProduct(prodId, title, description, imageURL));
    } else {
      dispatch(createProduct(title, description, imageURL, price));
    }
    navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prodId, title, imageURL, price, description, dispatch]);

  const titleChangeHandler = (text: string) => {
    if (text.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
      setTitle(text);
    }
  };

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
            onChangeText={titleChangeHandler}
            autoCapitalize="sentences"
            autoCorrect={false}
            returnKeyType="next"
            onEndEditing={() => console.log('onEndEditing')}
          />
          {!titleIsValid && <Text>Please enter a valid title!</Text>}
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
              value={price.toString()}
              onChangeText={text => setPrice(Number(text))}
              keyboardType="decimal-pad"
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

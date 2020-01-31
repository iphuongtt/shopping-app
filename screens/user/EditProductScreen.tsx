import React, {useEffect, useCallback, useReducer} from 'react';
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

interface FormState {
  inputValues: {
    title: string;
    description: string;
    price: string;
    imageURL: string;
  };
  inputValidities: {
    title: boolean;
    description: boolean;
    price: boolean;
    imageURL: boolean;
  };
  formIsValid: boolean;
}
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
type ACTIONS = typeof FORM_INPUT_UPDATE;
interface Action {
  value: string;
  type: ACTIONS;
  isValid: boolean;
  input: string;
}

const formReducer = (state: FormState, action: Action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

export const EditProductScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const prodId = navigation.getParam('productId');
  const editedProduct = useTypedSelector(state =>
    state.products.userProducts.find(product => product.id === prodId),
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageURL: editedProduct ? editedProduct.imageUrl : '',
      price: '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageURL: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const dispatch = useDispatch();

  const handleSave = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (prodId) {
      dispatch(
        updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageURL,
        ),
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageURL,
          +formState.inputValues.price,
        ),
      );
    }
    navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prodId, formState, dispatch]);

  const textChangeHandler = (inputIdentifier: string, text: string) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier,
    });
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
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this, 'title')}
            autoCapitalize="sentences"
            autoCorrect={false}
            returnKeyType="next"
            onEndEditing={() => console.log('onEndEditing')}
          />
          {!formState.inputValidities.title && (
            <Text>Please enter a valid title!</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageURL}
            onChangeText={textChangeHandler.bind(this, 'imageURL')}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={textChangeHandler.bind(this, 'price')}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={textChangeHandler.bind(this, 'description')}
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

import React, {useEffect, useCallback, useReducer} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux';

import {CustomHeaderButton, Input} from '../../components/UI';
import {useTypedSelector} from '../../store/reducers';
import {postProduct, updateProduct} from '../../store/actions';

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
      title: !!editedProduct,
      imageURL: !!editedProduct,
      price: !!editedProduct,
      description: !!editedProduct,
    },
    formIsValid: !!editedProduct,
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
        postProduct(
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

  const inputChangeHandler = useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    navigation.setParams({handleSave});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSave]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{flex: 1}}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            initialValue={editedProduct ? editedProduct.title : ''}
            initialIsValid={!!editedProduct}
            autoCapitalize="sentences"
            autoCorrect={false}
            returnKeyType="next"
            label="Title"
            onInputChange={inputChangeHandler}
            errorMessage="Please enter a valid title!"
          />

          <Input
            id="imageURL"
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initialIsValid={!!editedProduct}
            label="Image Url"
            onInputChange={inputChangeHandler}
            errorMessage="Please enter a valid image url!"
          />

          {editedProduct ? null : (
            <Input
              id="price"
              initialValue=""
              initialIsValid={false}
              keyboardType="decimal-pad"
              returnKeyType="next"
              label="Price"
              min={0}
              onInputChange={inputChangeHandler}
              errorMessage="Please enter a valid price!"
            />
          )}

          <Input
            id="description"
            initialValue={editedProduct ? editedProduct.description : ''}
            initialIsValid={!!editedProduct}
            label="Description"
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            errorMessage="Please enter a valid description!"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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

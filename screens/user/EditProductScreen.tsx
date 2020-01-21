import React from 'react';
import {View, Text} from 'react-native';
import {NavigationStackScreenComponent} from 'react-navigation-stack';

export const EditProductScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const productId = navigation.getParam('productId');
  return (
    <View>
      <Text>This is edit product screen {productId}</Text>
    </View>
  );
};

EditProductScreen.navigationOptions = ({navigation}) => {
  const title = navigation.getParam('title');
  return {
    headerTitle: title,
  };
};

export default EditProductScreen;

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import {Card} from '../UI';
import {ViewProps} from '../../interfaces';

interface Props extends ViewProps {
  image: string;
  title: string;
  price: number;
  onSelect: Function;
}

export const ProductItem = (props: Props) => {
  const handleSelect = () => {
    props.onSelect();
  };
  let TouchableComp: any = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version > 23) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComp onPress={handleSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: props.image}} />
            </View>
            <View style={styles.detail}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableComp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
  detail: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default ProductItem;

import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Header from './components/Header';
import {Test} from './screens';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number" />
      <Test />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

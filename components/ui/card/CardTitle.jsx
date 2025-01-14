import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CardTitle = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CardTitle;

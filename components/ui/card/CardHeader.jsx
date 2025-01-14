import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardHeader = ({ children, style }) => {
  return <View style={[styles.header, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 15,
  },
});

export default CardHeader;

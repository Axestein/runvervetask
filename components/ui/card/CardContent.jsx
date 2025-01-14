import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardContent = ({ children, style }) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  content: {
    padding: 15,
  },
});

export default CardContent;

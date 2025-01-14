import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeContext } from '../ThemeContext'; 
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { isDarkMode } = useContext(ThemeContext); 
  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  const [name, setName] = useState('Aditya');
  const [age, setAge] = useState('19');
  const [goal, setGoal] = useState('10,000 steps a day');
  const [weight, setWeight] = useState('70'); 
  const [height, setHeight] = useState('175'); 

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <Text style={[styles.header, { color: themeStyles.headerTextColor }]}>Profile</Text>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: themeStyles.textColor }]}>Name:</Text>
        <TextInput
          style={[styles.input, { backgroundColor: themeStyles.inputBackground, color: themeStyles.textColor }]}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter your name"
          placeholderTextColor={themeStyles.placeholderTextColor}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: themeStyles.textColor }]}>Age:</Text>
        <TextInput
          style={[styles.input, { backgroundColor: themeStyles.inputBackground, color: themeStyles.textColor }]}
          value={age}
          onChangeText={(text) => setAge(text)}
          keyboardType="numeric"
          placeholder="Enter your age"
          placeholderTextColor={themeStyles.placeholderTextColor}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: themeStyles.textColor }]}>Weight (kg):</Text>
        <TextInput
          style={[styles.input, { backgroundColor: themeStyles.inputBackground, color: themeStyles.textColor }]}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
          placeholder="Enter your weight"
          placeholderTextColor={themeStyles.placeholderTextColor}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: themeStyles.textColor }]}>Height (cm):</Text>
        <TextInput
          style={[styles.input, { backgroundColor: themeStyles.inputBackground, color: themeStyles.textColor }]}
          value={height}
          onChangeText={(text) => setHeight(text)}
          keyboardType="numeric"
          placeholder="Enter your height"
          placeholderTextColor={themeStyles.placeholderTextColor}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: themeStyles.textColor }]}>Fitness Goal:</Text>
        <TextInput
          style={[styles.input, { backgroundColor: themeStyles.inputBackground, color: themeStyles.textColor }]}
          value={goal}
          onChangeText={(text) => setGoal(text)}
          placeholder="Set your fitness goal"
          placeholderTextColor={themeStyles.placeholderTextColor}
        />
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: themeStyles.buttonBackground }]} onPress={() => { /* logic */ }}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const darkTheme = {
  background: '#000',
  headerTextColor: '#ff4d4d',
  textColor: '#fff',
  inputBackground: '#333',
  buttonBackground: '#ff4d4d',
  placeholderTextColor: '#aaa',
};

const lightTheme = {
  background: '#f1f1f1',
  headerTextColor: '#7C3AED',
  textColor: '#000',
  inputBackground: '#fff',
  buttonBackground: '#7C3AED',
  placeholderTextColor: '#888',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

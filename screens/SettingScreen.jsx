import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../ThemeContext'; 

const SettingsScreen = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext); 
  
  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <Text style={[styles.title, { color: themeStyles.headerTextColor }]}>Settings</Text>
      <View style={[styles.section, { borderBottomColor: themeStyles.borderColor }]}>
        <Text style={[styles.sectionTitle, { color: themeStyles.textColor }]}>Appearance</Text>
        <View style={styles.switchRow}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>Enable Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(!isDarkMode)}
          />
        </View>
      </View>

      <View style={[styles.section, { borderBottomColor: themeStyles.borderColor }]}>
        <Text style={[styles.sectionTitle, { color: themeStyles.textColor }]}>Notifications</Text>
        <View style={styles.switchRow}>
          <Text style={[styles.text, { color: themeStyles.textColor }]}>Enable Notifications</Text>
          <Switch
            value={true} 
            onValueChange={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeStyles.textColor }]}>Language</Text>
        <Text style={[styles.text, { color: themeStyles.textColor }]}>English</Text>
      </View>

      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: themeStyles.buttonBackground }]}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const darkTheme = {
  headerTextColor: '#ff4d4d',
  background: '#121212',
  textColor: '#fff',
  borderColor: '#333',
  buttonBackground: '#ff4d4d',
  placeholderTextColor: '#888',
};

const lightTheme = {
  headerTextColor: '#7C3AED',
  background: '#f8f8f8',
  textColor: '#000',
  borderColor: '#ddd',
  buttonBackground: '#7C3AED',
  placeholderTextColor: '#888',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4d4d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

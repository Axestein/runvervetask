import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingScreen';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import DashboardScreen from './screens/DashboardScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const { isDarkMode } = useContext(ThemeContext); 

  const themeStyles = isDarkMode ? darkTheme : lightTheme; 
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: themeStyles.activeTintColor,
          tabBarStyle: {
            backgroundColor: themeStyles.tabBarBackground,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: themeStyles.headerBackground,
            },
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('./assets/logo.png')}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
                <Text style={{ color: themeStyles.headerTextColor, fontWeight: 'bold', fontSize: 24 }}>
                  RunVerve
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: themeStyles.headerBackground,
            },
            headerTitleStyle: {
              color: themeStyles.headerTextColor,
            },
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: themeStyles.headerBackground,
            },
            headerTitleStyle: {
              color: themeStyles.headerTextColor,
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: themeStyles.headerBackground,
            },
            headerTitleStyle: {
              color: themeStyles.headerTextColor,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

//for dark and light themes
const darkTheme = {
  headerBackground: '#000',
  headerTextColor: '#ff4d4d',
  tabBarBackground: '#000',
  activeTintColor: '#ff4d4d',
  background: '#1a1a1a',
  textColor: '#fff',
};

const lightTheme = {
  headerBackground: '#fff',
  headerTextColor: '#007bff',
  tabBarBackground: '#fff',
  activeTintColor: '#007bff',
  background: '#f1f1f1',
  textColor: '#000',
};

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

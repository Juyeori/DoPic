import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './userInfo/LoginState';

import HomeScreen from './HomeScreen';
import MainScreen from './MainScreen';
import LoginForm from './userInfo/LoginForm';
import SignupForm from './userInfo/SignupForm';
import AIHairDiagnosisScreen from './ai/AIHairDiagnosisScreen';
import ScalpDiaryScreen from './diary/ScalpDiaryScreen';
import MyPageScreen from './MyPage/MyPageScreen';
import BottomTabBar from './BottomTabBar';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginForm" component={LoginForm} options={{ headerTitle: '' }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerTitle: '', headerShown: false }} />
            <Stack.Screen name="SignupForm" component={SignupForm} options={{ headerTitle: '' }} />
            <Stack.Screen name="AIHairDiagnosisScreen" component={AIHairDiagnosisScreen} options={{ headerTitle: '' }} />
            <Stack.Screen name="ScalpDiaryScreen" component={ScalpDiaryScreen} options={{ headerTitle: '' }} />
            <Stack.Screen name="MyPageScreen" component={MyPageScreen} options={{ headerTitle: '' }} />
          </Stack.Navigator>
            <View style={styles.bottomTabBarContainer}>
              <BottomTabBar />
            </View>
          
        </View>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomTabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

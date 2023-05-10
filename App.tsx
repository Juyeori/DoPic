import React from 'react'
import {View, StyleSheet, SafeAreaView, Text, TextInput} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';


import HomeScreen from './HomeScreen';
import MainScreen from './MainScreen';
import LoginForm from './userInfo/LoginForm';
import SignupForm from './userInfo/SignupForm';
import AIHairDiagnosisScreen from './ai/AIHairDiagnosisScreen';
import ScalpDiaryScreen from './diary/ScalpDiaryScreen';
import MyPageScreen from './MyPage/MyPageScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
          <Stack.Screen name="LoginForm" component={LoginForm} options={{ headerTitle: '' }}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerTitle: '' }}/>
          <Stack.Screen name="SignupForm" component={SignupForm} options={{ headerTitle: '' }}/>
          <Stack.Screen name="AIHairDiagnosisScreen" component={AIHairDiagnosisScreen} options={{ headerTitle: '' }}/>
          <Stack.Screen name="ScalpDiaryScreen" component={ScalpDiaryScreen} options={{ headerTitle: '' }} />
          <Stack.Screen name="MyPageScreen" component={MyPageScreen} options={{ headerTitle: '' }} />
        </Stack.Navigator>
      </View>
      
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
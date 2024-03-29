import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import SignupStart from './userInfo/SignupStart';
import DiagnosisStart from './ai/DiagnosisStart';
import UploadPicture from './ai/UploadPicture';
import SignupSuccess from './userInfo/SIgnupSuccess';
import CreateRecord from './diary/CreateRecord';
import DetailedReport from './diary/DetailedReport';
import Result from './ai/Result';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    // AsyncStorage에서 로그인 상태를 확인하고 setIsLoggedIn을 호출하여 상태를 업데이트합니다.
    const userToken = await AsyncStorage.getItem('userToken');
    setIsLoggedIn(!!userToken); // userToken이 존재할 경우 true, 그렇지 않을 경우 false
  };

  return (
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator  screenOptions={{
          animation: 'none', // 화면 전환 애니메이션 효과 없애기
          headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginForm" component={LoginForm} options={{ animation: 'default',headerTitle: '로그인' }}  />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ animation: 'default', headerTitle: '', headerShown: false }} />
            <Stack.Screen name="SignupStart" component={SignupStart} options={{ animation: 'default', headerTitle:'회원가입'}}/>
            <Stack.Screen name="SignupForm" component={SignupForm} options={{ headerTitle: '회원가입' }} />
            <Stack.Screen name="SignupSuccess" component={SignupSuccess} options={{ headerTitle: '', headerShown: false }} />
            <Stack.Screen name="AIHairDiagnosisScreen" component={AIHairDiagnosisScreen} options={{ headerTitle: '' , headerShown: false }} />
            <Stack.Screen name="DiagnosisStart" component={DiagnosisStart} options={{ headerTitle: '두피 사진 등록' }} />
            <Stack.Screen name="UploadPicture" component={UploadPicture} options={{ headerTitle: ''}} />
            <Stack.Screen name="ScalpDiaryScreen" component={ScalpDiaryScreen} options={{ headerTitle: '' , headerShown: false }} />
            <Stack.Screen name="MyPageScreen" component={MyPageScreen} options={{ headerTitle: '' , headerShown: false }} />
            <Stack.Screen name="CreateRecord" component={CreateRecord} options={{ headerTitle: '기록 생성' }} />
            <Stack.Screen name="Result" component={Result} options={{ headerTitle: 'AI 진단결과' }} />
            <Stack.Screen
              name="DetailedReport"
              component={DetailedReport}
              options={({ route }) => ({
                headerTitle: `${route.params.selectedDate} 리포트`,
                headerTitleStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              })}
            />
          </Stack.Navigator>
          {isLoggedIn && (
          <View style={styles.bottomTabBarContainer}>
            <BottomTabBar />
          </View>
        )}
          
        </View>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, bottomTabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

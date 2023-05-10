import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BottomTabBar from './BottomTabBar';

const HomeScreen = () => {
    const handleLogout = async () => {
        try {
            // AsyncStorage에서 토큰을 가져옵니다.
            const token = await AsyncStorage.getItem('token');
        
            // 서버로 로그아웃 요청을 전송하는 코드
            const response = await axios.post('https://dopic.herokuapp.com/logout', {}, {
            headers: { Authorization: `Bearer ${token}` },
            });
        
            // AsyncStorage에서 토큰을 삭제합니다.
            await AsyncStorage.removeItem('token');
        
            console.log(response.data);
            console.log("로그아웃");
            // 로그아웃 처리 완료 후 로그인 화면으로 이동하는 코드
            // 이 부분은 해당하는 화면 구현에 따라 달라질 수 있습니다.
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
      <BottomTabBar/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
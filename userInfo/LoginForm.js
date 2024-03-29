import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';


const LoginForm = () => {
  const [_id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // 서버로 로그인 정보를 전송하는 코드
    const data = {
      _id,
      password,
    };
    console.log(data)
    // ipconfig 값 넣기
    axios.post('https://dopic.herokuapp.com/login', data)
    .then(async (response) => {
      console.log(response.data);
      // 토큰을 AsyncStorage에 저장합니다.
      await AsyncStorage.setItem('id', _id);
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('token', response.data.token);
      console.log(response.data.token);
      console.log("로그인 성공");
      navigation.navigate('HomeScreen');
    })
    .catch(error => {
      console.error(error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    });
  };

  const handleLogout = async () => {
    try {
      // AsyncStorage에서 토큰을 가져옵니다.
      const token = await AsyncStorage.getItem('token');
  
      // 서버로 로그아웃 요청을 전송하는 코드
      const response = await axios.post('https://dopic.herokuapp.com/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // AsyncStorage에서 토큰을 삭제합니다.
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('token');
  
      console.log(response.data);
      console.log("로그아웃");
      // 로그아웃 처리 완료 후 로그인 화면으로 이동하는 코드
      navigation.navigate('Main');
      // 이 부분은 해당하는 화면 구현에 따라 달라질 수 있습니다.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.guide}>
        <Text style={styles.title}>두픽과 함께 하는</Text>
        <Text style={styles.title}>슬기로운 두피 관리</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={_id}
        onChangeText={(text) => setId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.loginButton}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FindAccountForm')}>
            <Text style={styles.footerText}>아이디/비밀번호 찾기</Text>
          </TouchableOpacity>
      </View>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: '#fff',
  },
  guide: {
    top : '10%',
    left: '-15%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    top : '25%',
    width: '90%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 328
},
  button: {
    top : '30%',
    backgroundColor: '#008376',
    width: 328,
    height:48,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton : {
    top: '25%',
    alignItems: 'center',
  },
  footerText: {
    top : '150%',
    color: '#999999',
    fontSize: 14,
    marginRight: 20,
    marginLeft:20,
  },
});

export default LoginForm;
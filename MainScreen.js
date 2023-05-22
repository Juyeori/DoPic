import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LoginForm from './userInfo/LoginForm';
import SignupForm from './userInfo/SignupForm';
import BottomTabBar from './BottomTabBar';
import logo from './img/Logo.png';

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginForm')}
      >
        <Text style={styles.buttonText}>이메일로 시작하기</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignupStart')}>
          <Text style={styles.footerText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FindAccountForm')}>
          <Text style={styles.footerText}>아이디/비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      <View style={{
      position: 'absolute',
      width: 201,
      height: 10,
      left: 79,
      top: 662,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <Text style={{
          fontFamily: 'Noto Sans',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: 10,
          lineHeight: 10,
          textAlign: 'center',
          color: '#999999'
        }}>
          Copyright ⓒ SongJihee All rights Reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    width: 156,
    height: 156,
    position: 'absolute',
    top: 150, // 원하는 위치로 조절해주세요
  },
  button: {
    position: 'absolute',
    width: 328,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#008376',
    alignItems: 'center',
    justifyContent: 'center',
    top: 400, // 원하는 위치로 조절해주세요
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 200,
  },
  footerText: {
    color: '#999999',
    fontSize: 14,
    marginRight: 20,
    marginLeft:20,
  },
});

export default MainScreen;
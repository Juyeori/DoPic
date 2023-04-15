import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from './userInfo/LoginForm';
import SignupForm from './userInfo/SignupForm';

const MainScreen = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const toggleForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DoPic</Text>
      {isLoginFormVisible ? <LoginForm toggleForm={toggleForm} /> : <SignupForm toggleForm={toggleForm} />}
      <Text style={styles.toggleText} onPress={toggleForm}>
        {isLoginFormVisible ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  toggleText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default MainScreen;
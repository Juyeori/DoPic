import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupForm = () => {
  const [_id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigation = useNavigation();

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordMatch(text === confirmPassword);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setPasswordMatch(password === text);
  };

  const handleSignup = () => {
    if (!passwordMatch) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const data = {
      _id,
      password,
      nickName,
    };

    axios
      .post('https://dopic.herokuapp.com/User', data)
      .then((response) => {
        console.log(response.data);
        navigation.navigate('SignupSuccess');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('회원가입에 실패하였습니다.');
      });
  };

  return (
    <View style={styles.container}>
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
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        secureTextEntry
      />
      {passwordMatch ? (
        <Text style={styles.passwordMatchText}>비밀번호가 일치합니다.</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={nickName}
        onChangeText={(text) => setNickName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#008376',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    bottom: '-40%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passwordMatchText: {
    fontSize: 12,
    color: 'green',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
});

export default SignupForm;
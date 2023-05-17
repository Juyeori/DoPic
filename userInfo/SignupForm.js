import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SignupForm = () => {
  const [_id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleSignup = () => {
    
    // 서버로 회원가입 정보를 전송하는 코드
    const data = {
        _id,
        password,
        nickName,
    };
    console.log(data)
    //ipconfig 값 넣기
    //172.20.10.9
    axios.post('https://dopic.herokuapp.com/User', data)
    .then(response => {
      console.log(response.data);
      navigation.navigate('SignupSuccess');
    })
    .catch(error => {
      console.error(error);
      Alert.alert("회원가입에 실패하였습니다.")
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원 가입</Text>
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
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={nickName}
        onChangeText={(text) => setNickName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#008376',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default SignupForm;

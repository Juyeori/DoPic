import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../img/Logo.png';

const SignupSuccess = () => {
  const navigation = useNavigation();
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      navigation.navigate('Main');
    }

    return () => clearInterval(interval);
  }, [navigation, timer]);

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>회원가입을 환영합니다!</Text>
        <Text style={styles.timerText}>{`${timer}초 후에 홈으로 이동합니다.`}</Text>
      </View>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingTop: '20%',
    paddingRight: 20,
  },
  logo: {
    top: '42%',
    left: '-10%',
    width: 300,
    height: 300,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
  },
  messageText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  timerText: {
    fontSize: 14,
    color: '#008376',
    textAlign: 'right',
  },
});

export default SignupSuccess;
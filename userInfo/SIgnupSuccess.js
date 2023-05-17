import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupSuccess = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>회원가입을 환영합니다!</Text>
      </View>
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
  messageContainer: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default SignupSuccess;

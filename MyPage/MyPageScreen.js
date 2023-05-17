import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabBar from '../BottomTabBar';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const MyPageScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const data = [
    { id: '0', title: 'User ID' },
    { id: '1', title: '내 정보 수정' },
    { id: '2', title: '결제 정보' },
    { id: '3', title: '로그아웃' },
  ];

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      setUserId(id);
    } catch (error) {
      console.log(error);
    }
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

  const renderItem = ({ item }) => {
    if (item.id === '0') {
      return (
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' }}>
          <Text style={{ fontSize: 16 }}>{userId}님</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' }}
          onPress={() => {
            if (item.id === '3') {
              handleLogout();
            } else {
              // 다른 항목 선택 시 동작 추가
            }
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{ padding: 16 }}
      />
      <View style={styles.bottomTabBarContainer}>
        <BottomTabBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MyPageScreen;

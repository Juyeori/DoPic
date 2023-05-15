import React from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import BottomTabBar from '../BottomTabBar';

const MyPageScreen = () => {
  const data = [
    { id: '1', title: '내 정보 수정' },
    { id: '2', title: '결제 정보' },
    { id: '3', title: '로그아웃' },
  ];

  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' }}>
      <Text style={{ fontSize: 16 }}>{item.title}</Text>
    </View>
  );

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

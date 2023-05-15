import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomTabBar = () => {
  const navigation = useNavigation();

  const handleTabPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleTabPress('AIHairDiagnosisScreen')}>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>AI두피 진단</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTabPress('ScalpDiaryScreen')}>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>두피 일기장</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTabPress('MyPageScreen')}>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>마이페이지</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
  },
});

export default BottomTabBar;

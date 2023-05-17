import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomTabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleTabPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const isCurrentScreen = (screenName) => {
    return route.name === screenName;
  };

  const renderHomeButton = () => {
    return (
      <TouchableWithoutFeedback onPress={() => handleTabPress('HomeScreen')}>
        <View style={styles.tabItem}>
          <Text style={[styles.tabText, isCurrentScreen('HomeScreen') && styles.activeTabText]}>홈</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      {renderHomeButton()}
      <TouchableWithoutFeedback onPress={() => handleTabPress('AIHairDiagnosisScreen')}>
        <View style={styles.tabItem}>
          <Text style={[styles.tabText, isCurrentScreen('AIHairDiagnosisScreen') && styles.activeTabText]}>AI두피 진단</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTabPress('ScalpDiaryScreen')}>
        <View style={styles.tabItem}>
          <Text style={[styles.tabText, isCurrentScreen('ScalpDiaryScreen') && styles.activeTabText]}>두피 일기장</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleTabPress('MyPageScreen')}>
        <View style={styles.tabItem}>
          <Text style={[styles.tabText, isCurrentScreen('MyPageScreen') && styles.activeTabText]}>마이페이지</Text>
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
  activeTabText: {
    color: 'blue',
  },
});

export default BottomTabBar;

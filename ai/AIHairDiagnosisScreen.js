import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../BottomTabBar';

const AIHairDiagnosisScreen = () => {
  const navigation = useNavigation();

  const handleStartDiagnosis = () => {
    navigation.navigate('DiagnosisStart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>두피 진단을 시작하려면 버튼을 눌러주세요.</Text>
        <TouchableOpacity style={styles.button} onPress={handleStartDiagnosis}>
          <Text style={styles.buttonText}>두피 진단 시작</Text>
        </TouchableOpacity>
      </View>
    <View style={styles.bottomTabBarContainer}>
      <BottomTabBar />
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
  box: {
  backgroundColor: '#f2f2f2',
  padding: 20,
  },
  text: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 20,
  },
  button: {
  backgroundColor: '#2196F3',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  },
  buttonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  },
  bottomTabBarContainer: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  },
});

export default AIHairDiagnosisScreen;
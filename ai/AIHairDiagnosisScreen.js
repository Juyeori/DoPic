import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../BottomTabBar';
import guide from '../img/guide.png';
import Header from '../component/Header';

const AIHairDiagnosisScreen = () => {
  const navigation = useNavigation();

  const handleStartDiagnosis = () => {
    navigation.navigate('DiagnosisStart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="AI 두피 진단"/>
      </View>
      <Image source={guide} style={styles.guide} />
      <View style={styles.box}>
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
  guide : {
    top : '-5%',
    width: '90%',
  },
  header : {
    top: "-8%",
    width: '100%',
  },
  container: {
  backgroundColor: '#fff',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
  box: {
  bottom: '5%',
  width: '100%',
  alignItems : 'center',
  backgroundColor: '#fff',
  padding: 20,
  },
  text: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 20,
  },
  button: {
  backgroundColor: '#008376',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  width : '95%',
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
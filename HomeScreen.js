import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomTabBar from './BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSelfDiagnosis = () => {
    navigation.navigate('SelfDiagnosis');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>최근 두피 상태</Text>
        <View style={styles.box}>
          {/* Content for the recent scalp condition */}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>맞춤 제품 추천</Text>
        <View style={styles.productContainer}>
          <View style={styles.productBox}>
            <Text style={styles.productText}>제품명</Text>
          </View>
          <View style={styles.productBox}>
            <Text style={styles.productText}>제품명</Text>
          </View>
          <View style={styles.productBox}>
            <Text style={styles.productText}>제품명</Text>
          </View>
          <View style={styles.productBox}>
            <Text style={styles.productText}>제품명</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSelfDiagnosis}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>설마... 나도 탈모?</Text>
          <Text style={styles.buttonText}>5분만에 나의 탈모 위험도 알아보기</Text>
          <Text style={[styles.buttonText, styles.surveyText]}>탈모 위험도 진단 설문</Text>
        </View>
        <View style={styles.iconBox}>
          {/* Survey icon */}
          {/* Add your chosen survey icon here */}
          {/* 예시: <Icon name="survey-icon" size={24} color="#008376" /> */}
        </View>
      </TouchableOpacity>
      <View style={styles.bottomTabBarContainer}>
        <BottomTabBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#ffffff",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  box: {
    backgroundColor: '#ffffff',
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  productBox: {
    backgroundColor: '#ffffff',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  productText: {
    fontSize: 12,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContent: {
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  surveyText: {
    color: '#008376',
    fontSize: 20,
  },
  iconBox: {
    backgroundColor: 'lightgray',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  bottomTabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;

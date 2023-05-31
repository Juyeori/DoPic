import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomTabBar from './BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './component/Header';
import Logo from './img/Logo.png'
import self from './img/self.png';
import s1 from './img/s1.png';
import s2 from './img/s2.png';
import s3 from './img/s3.png';
import s4 from './img/s4.png';
import latest from './img/latest.png';


const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSelfDiagnosis = () => {
    navigation.navigate('SelfDiagnosis');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <Header title="홈"/>
      </View>
      <Image source={Logo} style={styles.Logo} />
      <View style={styles.lastedSection}>
        <Text style={styles.title}>최근 두피 상태</Text>
        <View style={styles.box}>
          <Image source={latest} style={{width : 300, height: 80}}/>
        </View>
      </View>
      <View style={styles.productSection}>
        <Text style={styles.title}>맞춤 제품 추천</Text>
        <View style={styles.productContainer}>
          <View style={styles.productBox}>
            <Image source={s1} style={{width : 50, height: 50}}/>
            <Text style={styles.productText}>TS</Text>
          </View>
          <View style={styles.productBox}>
            <Image source={s2} style={{width : 50, height: 50}}/>
            <Text style={styles.productText}>아브카</Text>
          </View>
          <View style={styles.productBox}>
            <Image source={s3} style={{width : 50, height: 50}}/>
            <Text style={styles.productText}>닥터방기원</Text>
          </View>
          <View style={styles.productBox}>
            <Image source={s4} style={{width : 50, height: 50}}/>
            <Text style={styles.productText}>라보에이지</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.selfTitle}>탈모 자가 진단</Text>
      <TouchableOpacity style={styles.button} onPress={handleSelfDiagnosis}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>설마... 나도 탈모?</Text>
          <Text style={styles.buttonText}>5분만에 나의 탈모 위험도 알아보기</Text>
          <Text style={[styles.buttonText, styles.surveyText]}>탈모 위험도 진단 설문</Text>
        </View>
        <Image source={self} style={styles.iconBox} />
      </TouchableOpacity>
      <View style={styles.bottomTabBarContainer}>
        <BottomTabBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Logo: {
    position : 'absolute',
    width: "5%",
    height: "5%",
    top : "1%",
    left: "2%",
  },
  header : {
    top : '-16%',
    width: '100%',
  },
  container: {
    backgroundColor:"#ffffff",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastedSection : {
    top : '-13%',
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  productSection : {
    top : "-7%",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },

  section: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  box: {
    backgroundColor: '#ffffff',
    width: "100%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    width : "90%",
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  surveyText: {
    color: '#008376',
    fontSize: 20,
  },
  iconBox: {
    right : '-50%',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  selfTitle : {
    width: '100%',
    paddingLeft: 20,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  bottomTabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomTabBar from './BottomTabBar';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSelfDiagnosis = () => {
    navigation.navigate('SelfDiagnosis');
  };

  const handlePhotoDiagnosis = () => {
    navigation.navigate('PhotoDiagnosis');
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
          {/* Add code to display personalized product recommendations */}
          <View style={styles.productBox}>
            {/* Product 1 */}
          </View>
          <View style={styles.productBox}>
            {/* Product 2 */}
          </View>
          <View style={styles.productBox}>
            {/* Product 3 */}
          </View>
          <View style={styles.productBox}>
            {/* Product 4 */}
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSelfDiagnosis}>
        <Text style={styles.buttonText}>탈모 자가 진단</Text>
      </TouchableOpacity>
      <View style={styles.bottomTabBarContainer}>
        <BottomTabBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: '#e6e6e6',
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
    backgroundColor: '#e6e6e6',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
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

export default HomeScreen;

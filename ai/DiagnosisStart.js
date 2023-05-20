import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BottomTabBar from '../BottomTabBar';
import { useNavigation } from '@react-navigation/native';

const DiagnosisStart = () => {
  const navigation = useNavigation();
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        // 촬영된 사진으로 처리할 작업을 수행합니다.
        console.log(result);
      }
    } else {
      // 카메라 접근 권한이 거부된 경우
      console.log('카메라 접근 권한이 거부되었습니다');
    }
  };

  const handleUploadPhoto = async () => {
    navigation.navigate('UploadPicture');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>두피 사진을 입력해주세요.</Text>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>사진 촬영</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUploadPhoto}>
          <Text style={styles.buttonText}>사진 등록</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomTabBarContainer} >
        <BottomTabBar/>
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
    backgroundColor: '#008376',
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
  },bottomTabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default DiagnosisStart;

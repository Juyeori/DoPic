import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomTabBar from '../BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import camera from '../img/camera.png';
import pictures from '../img/pictures.png';

import { launchCamera } from 'react-native-image-picker';

const DiagnosisStart = () => {
  const navigation = useNavigation();
  const [photoUri, setPhotoUri] = useState(null);

  const handleTakePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('사용자가 촬영을 취소했습니다.');
      } else if (response.error) {
        console.log('사진 촬영 중 오류가 발생했습니다:', response.error);
      } else {
        setPhotoUri(response.uri);
      }
    });
  };

  const handleUploadPhoto = () => {
    navigation.navigate('UploadPicture', { photoUri });
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>두피 사진을 입력해주세요.</Text>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Image source={camera} style={styles.camera} />
          <Text style={styles.buttonText}>사진 촬영</Text>
        </TouchableOpacity>
        {photoUri && (
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleUploadPhoto}
        >
          <Image source={pictures} style={styles.pictures} />
          <Text style={styles.buttonText}>사진 등록</Text>
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
    backgroundColor: '#fff',
  },
  box: {
    top: '-10%',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  bottomTabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default DiagnosisStart;

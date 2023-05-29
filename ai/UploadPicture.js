import React, { useState } from 'react';
import { View, Image, Button, ActivityIndicator, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import logo from '../img/Logo.png';

const UploadPicture = () => {
  const [imageUris, setImageUris] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleChooseImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', maxFiles: 4, includeBase64: true },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const selectedImageUris = response.assets.map((asset) => asset.base64);
          setImageUris(selectedImageUris);
        }
      }
    );
  };

  const handleUpload = async () => {
    try {
      setLoading(true); // 스피너 표시

      for (const base64Data of imageUris) {

        const response = await axios.post('http://127.0.0.1:8080/predict_base64', {'data': base64Data});

        console.log('Image upload success');
        console.log('Server response:', response.data[0].predictions);
      }

      setLoading(false); // 스피너 감추기
      navigation.navigate('Result'); // 네비게이션 수행
    } catch (error) {
      console.log('Image upload error:', error);
      setLoading(false); // 스피너 감추기
    }
  };

  return (
    <View>
      <Button title="사진 선택" onPress={handleChooseImage} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {imageUris.map((uri, index) => (
          <Image key={index} source={{ uri }} style={{ width: 100, height: 100, margin: 5 }} />
        ))}
      </View>
      <Button title="사진 전송" onPress={handleUpload} />
      {loading && 
      <View>
        <Text>
          AI두피진단중입니다.
        </Text>
        <ActivityIndicator size="large" color="#0000ff" />
        <Image source={logo}/>
      </View>
      }
    </View>
  );
};

export default UploadPicture;
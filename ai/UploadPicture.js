import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const UploadPicture = () => {
  const [imageUris, setImageUris] = useState([]);

  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', maxFiles: 4 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const selectedImageUris = response.assets.map((asset) => asset.uri);
        setImageUris(selectedImageUris);
      }
    });
  };

  const handleUpload = () => {
    imageUris.forEach((uri) => {
      const formData = new FormData();
      formData.append('image', {
        uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      console.log(formData);
    //   axios.post('https://example.com/upload', formData)
    //     .then((response) => {
    //       console.log('Image upload success:', response.data);
    //     })
    //     .catch((error) => {
    //       console.log('Image upload error:', error);
    //     });
    });
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
    </View>
  );
};

export default UploadPicture;

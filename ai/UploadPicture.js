import React, { useState } from 'react';
import { View, Image, Button, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      const results = [];
      const comment = [];
      for (const base64Data of imageUris) {
        const response = await axios.post('http://127.0.0.1:8080/predict_base64', {'data': base64Data});
  
        console.log('Image upload success');
        
        
        results[0] = response.data.predictions[0].predictions.피지.value
        results[1] = response.data.predictions[0].predictions.모낭홍반농포.value
        results[2] = response.data.predictions[0].predictions.탈모.value
        results[3] = response.data.predictions[0].predictions.비듬.value
        results[4] = response.data.predictions[0].predictions.모낭사이홍반.value
        results[5] = response.data.predictions[0].predictions.미세각질.value
        comment[0] = response.data.predictions[0].predictions.분석결과.분석결과;
        // '피지과다',
        //   '모낭홍반',
        //   '탈모',
        //   '        비듬',
        //   '모낭사이홍반',
        //   '미세각질',
        // const predictions = response.data.predictions[0];
        // const values = Object.values(predictions).map((prediction) => prediction.value);
        
        // results.push(values);
        console.log(results);
      }

      // 3초 대기
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      const id = await AsyncStorage.getItem('id'); // id 가져오기
      const token = await AsyncStorage.getItem('token'); // token 가져오기
      
      // 데이터 전송
      const dbResponse = await axios.post('https://dopic.herokuapp.com/record', {
        id: id,
        result: results,
        comment : comment[0],
        token: token,
      });
      
      
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
      };

      const selectedDate = formatDate(dbResponse.data.createdAt);
      setLoading(false); // 스피너 감추기
  
      
      
      navigation.navigate('Result', {
        selectedDate: selectedDate,
        comment : comment[0],
        events: results,
      });
      
    } catch (error) {
      console.log('Image upload error:', error);
      setLoading(false); // 스피너 감추기
    }
  };
  
  // 데이터 형식에 맞게 기록 포맷팅
  const formatEvents = (records) => {
    const formattedEvents = {};
    records.forEach((record) => {
      const date = record.createdAt.substring(0, 10);
      if (formattedEvents[date]) {
        formattedEvents[date].push(record);
      } else {
        formattedEvents[date] = [record];
      }
    });
    return formattedEvents;
  };

  return (
    <View>
      
      {loading ? (
      <View style={styles.spinnerContainer}>
        <View style={styles.spinnerText}>
          <Text style={{color : "#000", fontSize : 20}}>AI 두피 진단을 실시합니다.</Text>
          <Text style={{color : "#000", fontSize : 20}}>잠시 기다려주세요.</Text>
        </View>
        <ActivityIndicator size="large" color="#008376" style={styles.spinner} />
        <Image source={logo} style={styles.logo}/>
      </View>
      ) : (
        <View style={styles.container}>
          <Button title="사진 선택" onPress={handleChooseImage} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {imageUris.map((uri, index) => (
              <Image key={index} source={{ uri }} style={{ width: 100, height: 100, margin: 5 }} />
            ))}
          </View>
          <Button title="사진 전송" onPress={handleUpload} />
        </View>
      )
    }
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems : 'center',
  },
  spinnerText: {
    top : '20%',
    alignItems: 'center',
  },
  spinner: {
    top : '35%',
  },
  logo : {
    top : '50%',
    height: 300,
    width : 300,
  }
});
export default UploadPicture;
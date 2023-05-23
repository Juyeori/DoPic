import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import BottomTabBar from '../BottomTabBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateRecord = () => {
  const [searchText, setSearchText] = useState('');
  const [stressLevel, setStressLevel] = useState(null);
  const [sleepTime, setSleepTime] = useState('');
  const [scalpProduct, setScalpProduct] = useState('');
  const [recordedItems, setRecordedItems] = useState([]);

  const handleSearch = () => {
    // Implement search functionality
  };

  const handleStressLevelChange = (level) => {
    setStressLevel(level);
  };

  const handleSave = async () => {
    try {
      // Get the id and token from AsyncStorage
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');
  
      // Prepare the payload
      const payload = {
        id,
        result: '양호',
        memo: [`스트레스 지수 : ${stressLevel}`, scalpProduct, `${sleepTime} 잠`],
        token: token
      };
  
      // Save the information to the server using Axios
      const response = await axios.post('https://dopic.herokuapp.com/record', payload);
  
      // Handle the response and perform necessary actions
      console.log(response.data);
  
      // Add the recorded item to the list
      setRecordedItems(prevItems => [...prevItems, response.data]);
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };
  

  const renderStressButtons = () => {
    const stressLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return stressLevels.map((level) => (
      <TouchableOpacity
        key={level}
        style={[
          styles.stressButton,
          stressLevel === level && { backgroundColor: '#008376' }
        ]}
        onPress={() => handleStressLevelChange(level)}
      />
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.recordItem}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
      <View style={styles.recordsContainer}>
        
      </View>
      <Text style={styles.title}>스트레스 입력</Text>
      <View style={styles.stressButtonsContainer}>
        {renderStressButtons()}
      </View>
      <Text style={styles.title}>수면 시간</Text>
      <TextInput
        style={styles.input}
        placeholder="수면 시간 입력"
        value={sleepTime}
        onChangeText={setSleepTime}
      />
      <Text style={styles.title}>사용 두피 케어 제품</Text>
      <TextInput
        style={styles.input}
        placeholder="두피 케어 제품 입력"
        value={scalpProduct}
        onChangeText={setScalpProduct}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>정보 저장하기</Text>
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
    backgroundColor: '#fff',
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  recordsContainer: {
    backgroundColor: '#fff',
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  stressButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stressButton: {
    width: 20,
    height: 20,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#008376',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bottomTabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default CreateRecord;

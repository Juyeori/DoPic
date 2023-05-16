import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabBar from '../BottomTabBar';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScalpDiaryScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});

  useEffect(() => {
    fetchRecords();
  }, []);

  //db 조회
  const fetchRecords = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token'); // 토큰을 AsyncStorage에서 가져옴
      
      console.log(token);
      const response = await axios.get(`https://dopic.herokuapp.com/recordAll/${id}?token=${token}`);
  
      const records = response.data;
      const formattedEvents = formatEvents(records);
      setEvents(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };
  
  //json 처리
  const formatEvents = (records) => {
    const formattedEvents = {};
    records.forEach((record) => {
      const date = record.createdAt.substring(0, 10); // Extract the date from the createdAt field, modify it according to your data structure
      if (formattedEvents[date]) {
        formattedEvents[date].push(record);
      } else {
        formattedEvents[date] = [record];
      }
    });
    return formattedEvents;
  };
  

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const renderEvents = () => {
    if (selectedDate && events[selectedDate]) {
      return events[selectedDate].map((record, index) => (
        <View key={index}>
          <Text>{record.result}</Text>
          <Text>{record.memo.join(", ")}</Text>
        </View>
        // Modify the property names according to your data structure
      ));
    } else {
      return <Text>No events</Text>;
    }
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Scalp Diary Screen</Text>
        <Calendar
          onDayPress={(day) => handleDateSelect(day.dateString)}
          markedDates={{ [selectedDate]: { selected: true } }}
        />
        {renderEvents()}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#e8e8e8',
    width: '80%',
    height: '50%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomTabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ScalpDiaryScreen;

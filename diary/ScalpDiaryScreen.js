import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../BottomTabBar';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScalpDiaryScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [latestRecord, setLatestRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  // 데이터베이스에서 최근 기록 가져오기
  const fetchRecords = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');
      setLoading(true);
      const response = await axios.get(`https://dopic.herokuapp.com/recordAll/${id}?token=${token}`);
      const records = response.data;
      const formattedEvents = formatEvents(records);
      setEvents(formattedEvents);

      // 가장 최근 기록 가져오기
      const latestRecord = getLatestRecord(records);
      setLatestRecord(latestRecord);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  // 가장 최근 기록 가져오기
  const getLatestRecord = (records) => {
    if (records.length > 0) {
      return records[records.length - 1];
    }
    return null;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDetailedReport = () => {
    navigation.navigate('DetailedReport');
  };

  const renderEvents = () => {
    if (selectedDate && events[selectedDate]) {
      return events[selectedDate].map((record, index) => (
        <View key={index}>
          <Text>{record.result}</Text>
          <Text>{record.memo.join(", ")}</Text>
        </View>
      ));
    } else {
      return <Text>No events</Text>;
    }
  };

  const renderDetailedReportButton = () => {
    if (selectedDate && events[selectedDate]) {
      return (
        <TouchableOpacity style={styles.button} onPress={handleDetailedReport}>
          <Text style={styles.buttonText}>자세히 보기</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const renderLoading = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderLoading()}
      <View style={styles.box}>
        {latestRecord && (
          <View>
            <Text>가장 최근 정보:</Text>
            <Text>{latestRecord.result}</Text>
            <Text>{latestRecord.memo.join(", ")}</Text>
          </View>
        )}
        <Calendar
          onDayPress={(day) => handleDateSelect(day.dateString)}
          markedDates={{ [selectedDate]: { selected: true } }}
        />
        {renderEvents()}
        {renderDetailedReportButton()}
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
  button: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScalpDiaryScreen;

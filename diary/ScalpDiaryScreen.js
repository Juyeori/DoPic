import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  // 데이터베이스에서 최근 기록 가져오기
  const fetchRecords = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`https://dopic.herokuapp.com/recordAll/${id}?token=${token}`);
      const records = response.data;
      const formattedEvents = formatEvents(records);
      setEvents(formattedEvents);

      // 가장 최근 기록 가져오기
      const latestRecord = getLatestRecord(records);
      setLatestRecord(latestRecord);

      setIsLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.log(error);
      setIsLoading(false); // 데이터 로딩 실패
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

  const theme = {
    arrowColor: '#008376', // 화살표 색상
    todayTextColor: '#008376', // 오늘 날짜 색상
    textMonthFontWeight: 'bold', // 월 글자 두께
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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="008376" />
          <Text style={styles.loadingText}>정보를 불러오는 중입니다...</Text>
        </View>
      ) : (
        <View style={styles.box}>
          {latestRecord && (
            <View>
              <Text>가장 최근 정보:</Text>
              <Text>{latestRecord.result}</Text>
              <Text>{latestRecord.memo.join(", ")}</Text>
            </View>
          )}
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => handleDateSelect(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#008376',
                },
              }}
              theme={theme}
            />
          </View>
          <View style={styles.eventsContainer}>
            {renderEvents()}
            {renderDetailedReportButton()}
          </View>
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: '#008376',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScalpDiaryScreen;

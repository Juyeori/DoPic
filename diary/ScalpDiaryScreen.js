import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../BottomTabBar';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoundButton from '../component/RoundButton';
import Header from '../component/Header';

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

  const renderMarkedDates = () => {
    const markedDates = {};
  
    // events 객체의 key값(date)을 순회하면서 selectedDate와 비교하여 점 표시
    Object.keys(events).forEach((date) => {
      if (date === selectedDate || (selectedDate === null && events[date])) {
        markedDates[date] = { marked: true, dotColor: '#008376' };
      } else {
        markedDates[date] = { marked: false };
      }
    });
  
    return markedDates;
  };

  const createHandler = () => {
    console.log('hi');
    navigation.navigate('CreateRecord');
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="008376" />
          <Text style={styles.loadingText}>정보를 불러오는 중입니다...</Text>
        </View>
      ) : (
        <View style={styles.box}>
          <View style={styles.header}>
            <Header title="두피 일기장"/>
          </View>
          {latestRecord && (
            <View style={styles.latestContainer}>
              <Text>가장 최근 정보:</Text>
              <Text>{latestRecord.result}</Text>
              <Text>{latestRecord.memo.join(", ")}</Text>
            </View>
          )}
          <View style={styles.ccc}>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={(day) => handleDateSelect(day.dateString)}
                markedDates={Object.entries({
                  ...renderMarkedDates(),
                  [selectedDate]: { selected: true, selectedColor: '#008376' },
                }).reduce((acc, [key, value]) => {
                  acc[key] = value;
                  return acc;
                }, {})}
                theme={theme}
                style={styles.calender}
                hideExtraDays
                
              />
            </View>
          </View>
          
          <View style={styles.eventsContainer}>
            {renderEvents()}
            {renderDetailedReportButton()}
          </View>
          
            <View style={styles.createButton}>
              <RoundButton  link="CreateRecord"/>
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
  header : {
    top : '-15%',
    width: '100%',
  },
  latestContainer: {
    top : '-15%',
    width: '90%',
    height: '12%',
    backgroundColor : "#ffffff",
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarContainer: {
    width : "90%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    aspectRatio: 1,
    flex : 1,
  },
  calendar: {
    flex: 1,
    text: 10,
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
  createButton :{
    position:'absolute',
    bottom:'20%',
    right:'20%'
    
  },
  eventsContainer : {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: '90%',
    height: '12%',
    bottom : '5%',
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
  ccc : {
    top:'-10%',
    width: '90%',
    height: '40%',
    backgroundColor : "#ffffff",
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  }

});

export default ScalpDiaryScreen;

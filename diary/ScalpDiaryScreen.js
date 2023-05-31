import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../BottomTabBar';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoundButton from '../component/RoundButton';
import Header from '../component/Header';
import { Svg, Polygon, Line, Text as SvgText} from 'react-native-svg';

const ScalpDiaryScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [latestRecord, setLatestRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  // 데이터베이스에서 기록 가져오기
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
    navigation.navigate('DetailedReport', {
      selectedDate: selectedDate,
      events: events,
    });
  };
  

  const theme = {
    arrowColor: '#008376', // 화살표 색상
    todayTextColor: '#008376', // 오늘 날짜 색상
    textMonthFontWeight: 'bold', // 월 글자 두께
  };

  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };
  
  const renderEvents = () => {
    if (selectedDate && events[selectedDate]) {
      return events[selectedDate].map((record, index) => (
        <View key={index}>
          <Text style={{ fontWeight: 'bold' }}>{formatDate(record.createdAt)}</Text>
          <Text style={{ color: '#008376' }}>{`#${record.comment}`}</Text>
          <Text>스트레스 지수: {record.memo[0]}/10</Text>
          <Text>수면시간: {record.memo[1]}시간</Text>
        </View>
      ));
    }
  };
  

  const renderPolygonEvents = () => {
    if (selectedDate && events[selectedDate]) {
      return events[selectedDate].map((record, index) => {
        const titles = [
          '피지과다',
          '모낭홍반',
          '탈모',
          '비듬',
          '모낭사이홍반',
          '미세각질',
        ];
  
        const polygonPoints = record.result
          .map((value, i) => {
            const angle = (2 * Math.PI * i) / 6;
            const radius = value * 15;
            const x = Math.cos(angle) * radius + 50;
            const y = Math.sin(angle) * radius + 50;
            return `${x},${y}`;
          })
          .join(' ');
  
        const hexagonPoints = Array.from({ length: 6 }).map((_, i) => {
          const angle = (2 * Math.PI * i) / 6;
          const radius = 50; // 6각형의 반지름 조절
          const x = Math.cos(angle) * radius + 50;
          const y = Math.sin(angle) * radius + 50;
          return `${x},${y}`;
        }).join(' ');
  
        return (
          <View key={index}>
            <Svg width={120} height={120}>
              <Polygon
                points={hexagonPoints}
                fill="#ebebeb" // 6각형 배경색
                stroke="none" // 6각형 테두리 없음
              />
              <Polygon
                points={polygonPoints}
                fill="#008376" // 다각형 색
                stroke="#008376" // 다각형 테두리 없음
              />
              {titles.map((title, i) => {
                const angle = (2 * Math.PI * i) / 6;
                const radius = 50; // 타이틀이 위치할 반지름 조절
                const x = Math.cos(angle) * radius + 50;
                const y = Math.sin(angle) * radius + 50;
                return (
                  <SvgText
                    key={i}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#000"
                    fontSize={9}
                  >
                    {title}
                  </SvgText>
                );
              })}
            </Svg>
          </View>
        );
      });
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
                
                
              />
            </View>
          </View>
          
          <TouchableOpacity style={styles.eventsContainer} onPress={handleDetailedReport}>
            <View style={styles.data}>
              {renderEvents()}
            </View>
            <View style={styles.Polygon}>{renderPolygonEvents()}</View>
          </TouchableOpacity>
          
          
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
    top : '-18%',
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
    height: '15%',
    bottom : '5%',
    alignItems: 'center',
    justifyContent : 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Polygon : {
    left: '-25%',
    top : '-25%',

  },
  data: {
    top : '50%',
    right: '-15%',
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

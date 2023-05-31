import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Svg, Polygon, Line, Text as SvgText} from 'react-native-svg';
import BottomTabBar from '../BottomTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s1 from '../img/s1.png';
import s2 from '../img/s2.png';
import s3 from '../img/s3.png';
import s4 from '../img/s4.png';

const Result = ({ route }) => {
    const { selectedDate, comment ,events } = route.params;
    const [userDataText, setUserDataText] = useState(''); // 사용자 데이터 텍스트
    const [userDataStyle, setUserDataStyle] = useState({}); // 사용자 데이터 스타일
    const [userCommentData, setUserCommentData] = useState({}); // 사용자 코멘트 데이터
  
    useEffect(() => {
      fetchUserData();
    }, []);
  
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        //const comment = events[selectedDate]?.[0]?.comment;
        const userStyle = comment ? '#008376' : '#000000'; // 코멘트가 있는 경우 색상 설정
        const userTextStyle = comment ? { fontWeight: 'bold', fontSize: 16 } : {};
  
        const userDataText = `${id}님의 두피 유형은 `;
        const userDataStyle = { color: userStyle };
  
        setUserDataText(userDataText);
        setUserDataStyle(userDataStyle);
        setUserCommentData({ text: comment, style: userTextStyle });
      } catch (error) {
        console.log(error);
      }
    };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };


  const renderPolygonEvents = () => {
    const titles = [
      '피지',
      '모낭홍반농포',
      '탈모',
      '        비듬',
      '모낭사이홍반',
      '미세각질',
    ];

    const hexagonPoints = Array.from({ length: 6 }).map((_, i) => {
      const angle = (2 * Math.PI * i) / 6;
      const radius = 90; // 6각형의 반지름 조절
      const x = Math.cos(angle) * radius + 90;
      const y = Math.sin(angle) * radius + 90;
      return `${x},${y}`;
    }).join(' ');
  
    const polygonPoints = events.map((value, i) => {
      const angle = (2 * Math.PI * i) / 6;
      const radius = value * 30;
      const x = Math.cos(angle) * radius + 90;
      const y = Math.sin(angle) * radius + 90;
      return `${x},${y}`;
    }).join(' ');
  
    return (
      <>
        <Svg width="300" height="300">
          <Polygon points={hexagonPoints} fill="#ebebeb" stroke="none" />
          <Polygon points={polygonPoints} fill="#008376" stroke="#008376" />
          {titles.map((title, i) => {
                const angle = (2 * Math.PI * i) / 6;
                const radius = 90; // 타이틀이 위치할 반지름 조절
                const x = Math.cos(angle) * radius + 90;
                const y = Math.sin(angle) * radius + 90;
                return (
                  <SvgText
                    key={i}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#000"
                    fontSize={14}
                  >
                    {title}
                  </SvgText>
                );
              })}
        </Svg>
        
      </>
    );
  };
  

  return (
    <View style={styles.container}>
        <View style={styles.Poligon}>
            {renderPolygonEvents()}
        </View>
      
      <View style={styles.latestContainer}>
        <Text style={styles.latestText}>{userDataText}</Text>
        <Text style={[styles.latestText, userDataStyle]}>{userCommentData.text}</Text>
        <Text style={[styles.latestText]}>입니다.</Text>
      </View>
      <View style={styles.manage}>
        <Text style={styles.manageTitle}>관리 방법</Text>
        <Text style={styles.description}>
            탈모성 두피는 피지가 많아 머리카락과 함께 떨어지는 경우가 많습니다. 따라서 세정력이 강한 샴푸나 두피 클렌저를 적당한 빈도로 사용해야 합니다.
            과도한 사용은 두피를 건조하게 만드므로 유의해야 합니다. 가급적 염색이나 펌을 자제하고, 영양제를 섭취하는 것을 추천합니다. 스트레스를 줄이고,
            규칙적인 생활습관을 통해 건강한 두피를 위한 노력이 필요합니다.
        </Text>
      </View>
      <View style={styles.productSection}>
        <Text style={styles.title}>맞춤 제품 추천</Text>
        <View style={styles.productContainer}>
          <View style={styles.productBox}>
            <Image source={s1} style={{width : 50, height: 50}}/>
            <Text style={styles.productText}>TS</Text>
          </View>
          <View style={styles.productBox}>
            <Image source={s2} style={{width : 50, height: 50}}/>
            <Text style={styles.productText}>아브카</Text>
          </View>
          <View style={styles.productBox}>
            <Image source={s3} style={{width : 50, height: 50}}/>
            <Text style={styles.productText}>닥터방기원</Text>
          </View>
          <View style={styles.productBox}>
            <Image source={s4} style={{width : 50, height: 50}}/>
            <Text style={styles.productText}>라보에이지</Text>
          </View>
        </View>
      </View>  
      <View style={styles.bottomTabBarContainer}>
        <BottomTabBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    manage: {
        top: '5%',
        width : '90%',
    },
    manageTitle: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        color: '#000000',
    },
    Poligon : {
        height: 1,
        justifyContent:'center',
        top: '-7%',
        left: '15%',
    }, 
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    latestContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    latestText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    bottomTabBarContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    productSection : {
        position: 'absolute',
        top : "72%",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      productBox: {
        backgroundColor: '#ffffff',
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 7,
        marginRight: 7,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      },
      productText: {
        fontSize: 12,
      },
})

export default Result;

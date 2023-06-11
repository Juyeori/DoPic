import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Svg, Polygon, Line, Text as SvgText} from 'react-native-svg';
import BottomTabBar from '../BottomTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s1 from '../img/s1.png';
import s2 from '../img/s2.png';
import s3 from '../img/s3.png';
import s4 from '../img/s4.png';


const DetailedReport = ({ route }) => {
    const { selectedDate, events } = route.params;
    const [userDataText, setUserDataText] = useState(''); // 사용자 데이터 텍스트
    const [userDataStyle, setUserDataStyle] = useState({}); // 사용자 데이터 스타일
    const [userCommentData, setUserCommentData] = useState({}); // 사용자 코멘트 데이터
  
    useEffect(() => {
      fetchUserData();
    }, []);
  
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        const comment = events[selectedDate]?.[0]?.comment;
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
    if (selectedDate && events[selectedDate]) {
      return events[selectedDate].map((record, index) => {

        const titles = [
          '피지',
          '모낭홍반농포',
          '탈모',
          '        비듬',
          '모낭사이홍반',
          '미세각질',
        ];
  
        const polygonPoints = record.result
          .map((value, i) => {
            const angle = (2 * Math.PI * i) / 6;
            const radius = value * 30;
            const x = Math.cos(angle) * radius + 90;
            const y = Math.sin(angle) * radius + 90;
            return `${x},${y}`;
          })
          .join(' ');
  
        const hexagonPoints = Array.from({ length: 6 }).map((_, i) => {
          const angle = (2 * Math.PI * i) / 6;
          const radius = 90; // 6각형의 반지름 조절
          const x = Math.cos(angle) * radius + 90;
          const y = Math.sin(angle) * radius + 90;
          return `${x},${y}`;
        }).join(' ');
  
        return (
          <View key={index}>
            <Svg width={300} height={300}>
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
          </View>
        );
      });
    }
  };

  const handleManage = () => {
    let result = null
    console.log(userCommentData.text);
    if (userCommentData.text == '복합성') {
      result =  (
        <Text style={styles.description}> 
          중증도에 따라 세부적 유형이 다를 수 있습니다.
          따라서 세정력이 강한 샴푸나 두피 클렌저를 적당한 빈도로 사용해야 합니다.
            과도한 사용은 두피를 건조하게 만드므로 유의해야 합니다. 가급적 염색이나 펌을 자제하고, 영양제를 섭취하는 것을 추천합니다. 
            스트레스를 줄이고,
            규칙적인 생활습관을 통해 건강한 두피를 위한 노력이 필요합니다.
        </Text>
      )
      }
    if (userCommentData.text === '건성') {
        result =  (
          <Text style={styles.description}>
            건성 두피는 두피 염증과 비듬 등을 유발할 수 있으므로 적절한 관리가 필요합니다. 
            드라이 샴퓨나 세정력이 강한 샴푸를 피하고, 자극을 받지 않는 살균력이 적은 샴푸를 선택해야 합니다. 
            영양 부족으로 더욱 건조해질 수 있으므로 비타민 A, B, C, E와 같은 영양소를 함유한 식품이나 영양제를 섭취하는 것을 추천합니다. 
            또한 보습을 위해 보습력이 뛰어난 헤어 오일이나 에센스를 사용하고, 혈액순환을 촉진시키기 위해 두피 마사지를 하는 것도 효과적입니다. 
          </Text>
        )
    }

    if (userCommentData.text === '지성') {
      result =  (
        <Text style={styles.description}>
          지성 두피는 피지 분비가 과다한 상태로, 머리카락이 자주 지름지고 가려움증이 생길 수 있습니다. 
          따라서 자극을 받지 않는 살균력이 높은 샴푸를 선택해야 합니다. 또한 뜨거울 물로 씻는 것은 피지 분비를 촉진시킬 수 있기 때문에 미지근한 물을 사용해야 합니다. 
          헤어 드라이기는 고온의 열기로 건조해져 더 많은 피지 분비를 유발할 수 있기 때문에 자주 사용하지 않는 것이 좋습니다. 
          지방과 당분이 많은 음식은 더욱 피지 분비를 유발할 수 있으므로 피하는 것을 추천합니다. 
        </Text>
      )
    }

    else if (userCommentData.text == "민감성") {
      console.log('ping')
      result =  (
        <Text style={styles.description}>
          민감성 두피는 피부 보호 기능이 약하므로 향이나 화학 성분이 들어간 샴푸보다 자극이 적은 천연성분이 들어간 샴푸를 선택하는 것이 좋습니다. 
          두피에 자극을 주지 않는 미지근한 온도의 물과 드라이를 사용하고, 두피 마사지를 통해 혈액순환을 촉진하는 것도 도움이 됩니다. 
          마사지 시 너무 강하게 마사지하지 않도록 주의해야 합니다.
        </Text>
      )
    }

    if (userCommentData.text === '지루성') {
      result =  (
        <Text style={styles.description}>
          지루성 두피는 지루한 피지 분비로 인해 비듬이 발생할 수 있습니다. 
          따라서 피지 분비를 조절해줄 수 있는 살리실산이나 카르복시메틸셀룰로오스, 아연 피리톤, 살구나무 열매 등의 성분이 들어간 샴푸가 좋습니다. 
          지루성 두피는 식습관과도 관련이 있으므로 고지방, 고당도, 고열량 음식을 피하고, 식이섬유가 풍부한 채소와 과일, 식물성 단백질이 풍부한 음식을 섭취하는 것을 추천합니다. 
        </Text>
      )
    }

    if (userCommentData.text === '염증성') {
      result =  (
        <Text style={styles.description}>
          염증성 두피는 민감하므로 화학성분이 적은 천연성분이 들어간 샴푸를 선택하는 것이 좋습니다. 
          특히 향이나 알코올 성분이 들어간 샴푸를 피해야 합니다. 뜨거운 물과 드라이기나 스타일링 도구의 열은 머리카락과 두피에 손상을 줄 수 있으니 주의해야 합니다. 
          염증성 두피는 전문적인 약용 제품을 사용해 치료할 필요가 있습니다. 전문가와 상담하여 적절한 약용 제품을 선택하고 사용해야 합니다.
        </Text>
      )
    }

    if (userCommentData.text === '비듬성') {
      result =  (
        <Text style={styles.description}>
          비듬성 두피는 화학성분이 적은 천연성분이 들어간 샴푸를 선택하는 것이 좋습니다.
          살리실산, 피로크톤올라민과 같은 성분이 들어간 제품이 효과적입니다. 
          비듬성 두피를 진행시키는 원인에 따라 다양한 약용 제품을 사용할 수 있습니다. 
          비타민, 아연, 비타민D, 오메가-3 지방산 등의 영양소가 부족한 경우 비듬성 두피를 악화시킬 수 있기 때문에 규칙적인 식습관과 영양소가 다양한 음식을 먹는 것이 중요합니다.
        </Text>
      )
    }

    if (userCommentData.text === '탈모성') {
      result =  (
        <Text style={styles.description}>
          탈모성 두피는 피지가 많아 머리카락과 함께 떨어지는 경우가 많습니다. 따라서 세정력이 강한 샴푸나 두피 클렌저를 적당한 빈도로 사용해야 합니다.
          과도한 사용은 두피를 건조하게 만드므로 유의해야 합니다. 가급적 염색이나 펌을 자제하고, 영양제를 섭취하는 것을 추천합니다. 스트레스를 줄이고,
          규칙적인 생활습관을 통해 건강한 두피를 위한 노력이 필요합니다.
        </Text>
      )
    }
      

    return result;
  }

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
            {handleManage()}
            
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
        top: '-5%',
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
        top : "73%",
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

export default DetailedReport;

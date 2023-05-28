import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SignupStart = ({ navigation }) => {
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [isServiceAgreed, setIsServiceAgreed] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(false);
  const [isExpandedService, setIsExpandedService] = useState(false);
  const [isExpandedPrivacy, setIsExpandedPrivacy] = useState(false);
  const [isExpandedMarketing, setIsExpandedMarketing] = useState(false);

  useEffect(() => {
    // 약관 전체 동의 상태 업데이트
    const allAgreed = isServiceAgreed && isPrivacyAgreed && isMarketingAgreed;
    setIsAllAgreed(allAgreed);
  }, [isServiceAgreed, isPrivacyAgreed, isMarketingAgreed]);

  const handleAgreeAll = () => {
    const toggleAllAgreed = !isAllAgreed;
    setIsAllAgreed(toggleAllAgreed);
    setIsServiceAgreed(toggleAllAgreed);
    setIsPrivacyAgreed(toggleAllAgreed);
    setIsMarketingAgreed(toggleAllAgreed);
  };

  const handleAgreeService = () => {
    setIsServiceAgreed(!isServiceAgreed);
  };

  const handleAgreePrivacy = () => {
    setIsPrivacyAgreed(!isPrivacyAgreed);
  };

  const handleAgreeMarketing = () => {
    setIsMarketingAgreed(!isMarketingAgreed);
  };

  const handleContinue = () => {
    // SignupForm 컴포넌트로 이동
    navigation.navigate('SignupForm');
  };

  const handleExpandService = () => {
    setIsExpandedService(!isExpandedService);
  };

  const handleExpandPrivacy = () => {
    setIsExpandedPrivacy(!isExpandedPrivacy);
  };

  const handleExpandMarketing = () => {
    setIsExpandedMarketing(!isExpandedMarketing);
  };

  return (
    <View style={styles.container}>
      <View style={styles.guide}>
        <Text style={styles.comment}>회원가입을 위해</Text>
        <Text style={styles.comment}>약관에 동의해주세요.</Text>
      </View>

      <View style={styles.check}>
        <TouchableOpacity style={styles.radioButton} onPress={handleAgreeAll}>
          <View style={[styles.radioButtonInner, isAllAgreed && styles.radioButtonSelected]} />
          <Text style={styles.radioButtonText}>약관 전체 동의</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.radioButton} onPress={handleAgreeService}>
          <View style={[styles.radioButtonInner, isServiceAgreed && styles.radioButtonSelected]} />
          <Text style={styles.radioButtonText}>서비스 이용약관 동의 (필수)</Text>
          <TouchableOpacity style={styles.expandButton} onPress={handleExpandService}>
            <Text style={styles.expandButtonText}>{isExpandedService ? 'v' : '>'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        {isExpandedService && (
          <View style={styles.expandedContent}>
            <Text style={styles.expandedText}>임의의 텍스트1</Text>
            <Text style={styles.expandedText}>임의의 텍스트2</Text>
            <Text style={styles.expandedText}>임의의 텍스트3</Text>
          </View>
        )}

        <TouchableOpacity style={styles.radioButton} onPress={handleAgreePrivacy}>
          <View style={[styles.radioButtonInner, isPrivacyAgreed && styles.radioButtonSelected]} />
          <Text style={styles.radioButtonText}>개인정보 처리방침 동의 (필수)</Text>
          <TouchableOpacity style={styles.expandButton} onPress={handleExpandPrivacy}>
            <Text style={styles.expandButtonText}>{isExpandedPrivacy ? 'v' : '>'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        {isExpandedPrivacy && (
          <View style={styles.expandedContent}>
            <Text style={styles.expandedText}>임의의 텍스트4</Text>
            <Text style={styles.expandedText}>임의의 텍스트5</Text>
            <Text style={styles.expandedText}>임의의 텍스트6</Text>
          </View>
        )}

        <TouchableOpacity style={styles.radioButton} onPress={handleAgreeMarketing}>
          <View style={[styles.radioButtonInner, isMarketingAgreed && styles.radioButtonSelected]} />
          <Text style={styles.radioButtonText}>마케팅 정보 제공 및 수신 동의 (선택)</Text>
          <TouchableOpacity style={styles.expandButton} onPress={handleExpandMarketing}>
            <Text style={styles.expandButtonText}>{isExpandedMarketing ? 'v' : '>'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        {isExpandedMarketing && (
          <View style={styles.expandedContent}>
            <Text style={styles.expandedText}>임의의 텍스트7</Text>
            <Text style={styles.expandedText}>임의의 텍스트8</Text>
            <Text style={styles.expandedText}>임의의 텍스트9</Text>
          </View>
        )}

        
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isAllAgreed ? '#008376' : '#ccc' }]}
        disabled={!isAllAgreed}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>계속하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guide: {
    top: '-20%',
    left: '-15%',
  },
  comment: {
    fontSize: 25,
  },
  check: {
    marginTop: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 30,
  },
  radioButtonSelected: {
    backgroundColor: '#008376',
    borderColor: '#008376',
  },
  radioButtonText: {
    fontSize: 18,
  },
  button: {
    top: '20%',
    width: '90%',
    backgroundColor: '#008376',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandButton: {
    marginLeft: 'auto',
  },
  expandButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandedContent: {
    marginLeft: 40,
  },
  expandedText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 10,
    marginBottom: 20,
  },
});

export default SignupStart;
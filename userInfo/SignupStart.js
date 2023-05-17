import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SignupStart = ({ navigation }) => {
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [isServiceAgreed, setIsServiceAgreed] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(false);

  const handleAgreeAll = () => {
    setIsAllAgreed(!isAllAgreed);
    setIsServiceAgreed(!isAllAgreed);
    setIsPrivacyAgreed(!isAllAgreed);
    setIsMarketingAgreed(!isAllAgreed);
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

  return (
    <View style={styles.container}>
      <Text style={styles.comment}>회원가입을 위해 약관에 동의해주세요.</Text>

      <TouchableOpacity style={styles.radioButton} onPress={handleAgreeAll}>
        <Text style={styles.radioButtonText}>전체 동의</Text>
        <Text style={styles.radioButtonText}>{isAllAgreed ? '✓' : '○'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.radioButton} onPress={handleAgreeService}>
        <Text style={styles.radioButtonText}>서비스 이용약관 동의 (필수)</Text>
        <Text style={styles.radioButtonText}>{isServiceAgreed ? '✓' : '○'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.radioButton} onPress={handleAgreePrivacy}>
        <Text style={styles.radioButtonText}>개인정보 처리방침 동의 (필수)</Text>
        <Text style={styles.radioButtonText}>{isPrivacyAgreed ? '✓' : '○'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.radioButton} onPress={handleAgreeMarketing}>
        <Text style={styles.radioButtonText}>마케팅 정보 제공 및 수신 동의 (선택)</Text>
        <Text style={styles.radioButtonText}>{isMarketingAgreed ? '✓' : '○'}</Text>
      </TouchableOpacity>

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comment: {
    fontSize: 18,
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonText: {
    marginLeft: 5,
    fontSize: 16,
  },button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupStart;

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RoundButton = ( {link} ) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate(link);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleNavigate}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 32,
    backgroundColor: '#008376',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#008376',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default RoundButton;

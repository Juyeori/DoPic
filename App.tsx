import React from 'react'
import {SafeAreaView, Text, TextInput} from 'react-native'
import SignupForm from './userInfo/SignupForm';

export default function App() {
  return (
    <SafeAreaView style={{flex : 1}}>
      
      <SignupForm/>
    </SafeAreaView>
  )
}
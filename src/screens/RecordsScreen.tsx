import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';


const RecordsScreen = () => {
  const navigator = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Text>Esta es la RecordsScreen</Text>      
    </View>
  )
}


const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center'
  }
})

export default RecordsScreen;
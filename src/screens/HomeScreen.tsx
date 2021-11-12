import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, PermissionsAndroid, Alert } from "react-native";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useNavigation } from '@react-navigation/native';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'

import { useStoreSelector, useStoreDispatch } from '../store'
import {hideLoading, showLoading } from '../store/reducers/loadingReducer'
import { fetchRecords } from '../store/reducers/recordsReducer'

const HomeScreen = () => {

  const loading = useStoreSelector(( store ) => store.loading.loading)

  const dispatch = useStoreDispatch();

  const navigator = useNavigation();
  const [player, setPlayer] = useState({});
  const [audio, setAudio] = useState({});

  const onStartRecord = async () => {
    const result = await player.startRecorder();
    player.addRecordBackListener((e) => {
      setAudio({
        recordSecs: e.currentPosition,
        recordTime: player.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await player.stopRecorder();
    player.removeRecordBackListener();
    setAudio({
      ...state,
      recordSecs: 0
    });
    console.log(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await player.startPlayer();
    console.log(msg);
    player.addPlayBackListener((e) => {
      setAudio({
        ...audio,
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: player.mmssss(Math.floor(e.currentPosition)),
        duration: player.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };  

  useEffect(() => {
    setPlayer(new AudioRecorderPlayer());
    return () => stopSound();
  }, []);
  
  return (
    <View style={{flex: 1}}>
      <Text>Esta es la pantalla de Home</Text>
      <TouchableOpacity
        style={ styles.btn }
        onPress={()=>navigator.navigate('HashTagsScreen')}
      >
        <Text style={{textAlign: 'center'}}>Go to hashtags</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={ styles.blueBtn }
        onPress={onStartRecord}
      >
        <Text style={{textAlign: 'center', color: 'white'}}>Start</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={ styles.blueBtn }
        onPress={onStopRecord }
      >
        <Text style={{textAlign: 'center', color: 'white'}}>Stop</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={ styles.blueBtn }
        onPress={onStartPlay }
      >
        <Text style={{textAlign: 'center', color: 'white'}}>PLAY</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={ styles.blueBtn }
        onPress={()=>{dispatch(loading ? hideLoading() : showLoading())}}
      >
        <Text style={{textAlign: 'center', color: 'white'}}>{loading ? 'Loading' : 'NO'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={ styles.blueBtn }
        onPress={()=>{dispatch(fetchRecords())}}
      >
        <Text style={{textAlign: 'center', color: 'white'}}>fetch Records</Text>
      </TouchableOpacity>
      
      <Text>{JSON.stringify(audio, null, 4)}</Text>
      
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
  },
  blueBtn: {
    backgroundColor: 'blue',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center'
  }
})

export default HomeScreen;
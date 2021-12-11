import React from "react";
import { ActivityIndicator, Image, Text, View, TextInput, TouchableOpacity, TouchableOpacityBase, Alert } from "react-native";
import { useEffect, useState, useRef } from 'react';
import movieDB from "../api/movieDB";
import { Movie, MovieDBNowPlaying } from '../interfaces/movie';
import { ScrollView } from "react-native-gesture-handler";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import MicIcon from "react-native-bootstrap-icons/icons/mic";
import StopCircle from "react-native-bootstrap-icons/icons/stop-circle";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ColorPicker from 'react-native-wheel-color-picker';
import Tooltip from 'react-native-walkthrough-tooltip';
import * as RNFS from 'react-native-fs';
import { sendCompleteRecord } from '../store/slices/recordsSlice'
import { useStoreSelector, useStoreDispatch } from '../store'

const HashTagsScreen = () => {
  
  const dispatch = useStoreDispatch();

  const [hashtag, setHashtag] = useState('hashtag');
  
  const [player, setPlayer] = useState({});
  const [audio, setAudio] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#00FF00');
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [recordPath, setRecordPath] = useState(false)

  const pickerRef = useRef(null);

  
  const [state, setstate] = useState<Movie[]>([])
  useEffect(()=>{

    // movieDB.get<MovieDBNowPlaying>('/now_playing')
    //   .then( res => {
    //     console.log(JSON.stringify(res.data, null, 3));
    //     setstate(res.data.results)
    //   });

    setPlayer(new AudioRecorderPlayer());
    //return () => stopSound();

  },[]);
  
  useEffect(() => {
    audio.recordSecs > 10000 && onStopRecord()
  }, [audio]);

  const onStartRecord = async () => {
    const result = await player.startRecorder();
    player.addRecordBackListener((e) => {
      setAudio({
        recordSecs: e.currentPosition,
        recordTime: player.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      setIsRecording(true)
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await player.stopRecorder();
    setRecordPath(result)
    player.removeRecordBackListener();
    setIsRecording(false)
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    await player.startPlayer();
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

  const sendRecord = async () => {
    const b64Audio = recordPath
    const b64Image = image

    dispatch(sendCompleteRecord({ b64Audio, b64Image, hashtag, selectedColor }))
  }

  const getImage = async () => await launchImageLibrary({
    maxHeight: 500
  }, (img) => {
    if (img.didCancel) return console.log('did Cancel');
    setImage(img.assets[0].uri?.toString());
    console.log(img);
  })

  const toggleRecordAudio = isRecording ? onStopRecord : onStartRecord
  const toggleRecordAudioIcon = isRecording
    ? <StopCircle width="50" height="50" viewBox="0 0 16 16" fill="rgb(199, 0, 0)" />
    : <MicIcon width="50" height="50" viewBox="0 0 16 16" fill="rgb(199, 0, 0)" />

  return (
    <ScrollView>
      <TextInput
        placeholder="hashtag"
        value={hashtag}
        onChangeText={(value) => setHashtag(value)}
      />
      <View
        style={{
          margin: 12,
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity
          onPress={toggleRecordAudio}
          style={{
            backgroundColor: '#000',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'            
          }}
        >
          <Text style={{color: '#fff'}}>{audio?.recordSecs}</Text>
          {toggleRecordAudioIcon}
        </TouchableOpacity>
        <TouchableOpacity
              onPress={onStartPlay}
              style={{
                backgroundColor: '#000',
                marginLeft: 6
              }}
              disabled={isRecording || !audio.recordSecs}
            >
              <Text style={{textAlign: 'center', color: 'white'}}>
                Play
              </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={getImage}
        style={{
          backgroundColor: '#000',
          marginLeft: 6,
          marginVertical: 6
        }}
      >
        <Text style={{textAlign: 'center', color: 'white'}}>
          getImage
        </Text>
      </TouchableOpacity>
      
      <Tooltip
        isVisible={showColorPicker}
        onClose={()=>setShowColorPicker(false)}
        contentStyle={{
          height: 400
        }}
        placement="bottom"
        content={
          <>
            <ColorPicker
              thumbSize={50}
              sliderSize={20}
              noSnap={true}
              row={false}
              onColorChangeComplete={(color: string) => setSelectedColor(color)}
              onPress
            />
            <TouchableOpacity
              onPress={()=>setShowColorPicker(false)}
              style={{
                backgroundColor: '#000',
                marginVertical: 12,
                justifyContent: 'center'
              }}
            >
              <Text style={{color: '#fff', textAlign: 'center'}}>Seleccionar</Text>
            </TouchableOpacity>
          </>
        }
      >
        <TouchableOpacity
          onPress={()=>setShowColorPicker(true)}
          style={{backgroundColor: '#000'}}
        >
          <Text style={{color: '#fff'}}>ShowColorPicker</Text>
        </TouchableOpacity>
      </Tooltip>

      <Text>{JSON.stringify(audio, null, 4)}</Text>
      <Text>{selectedColor}</Text>

      {
        image && (
          <Image
            source={{uri: image}}
            style={{width: 100, height: 100, alignSelf: 'flex-end', margin: 20}}
          />
        )
      }

      <TouchableOpacity
        onPress={sendRecord}
        style={{
          margin: 6,
          backgroundColor: '#00FF00'
        }}
      >
        <Text style={{color: '#000'}}>Enviar Audio</Text>
      </TouchableOpacity>
      
      {/*         
        {
          state
            ? state.map((item: Movie) => (
              <View style={{elevation: 5, marginVertical: 25, backgroundColor: 'azure'}} key={item.id.toString()}>
                <Text key={item.id.toString()} style={{fontSize: 18, padding: 12}}>{item.title}</Text>
                <Image
                  source={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}
                  style={{width: 100, height: 100, alignSelf: 'flex-end', margin: 20}}
                />
              </View>
              ))
            : <ActivityIndicator size={80} color='#e3e3e3' />
        }
      */}
      <View style={{width:200, backgroundColor: "#000"}}>
        <Text style={{color:'#FFF'}}>{image}</Text>
      </View>
      <View style={{width:200, backgroundColor: "#000", marginVertical: 20}}>
        <Text style={{color:'#FFF'}}>{recordPath}</Text>
      </View>

    </ScrollView>
  );
}

export default HashTagsScreen;
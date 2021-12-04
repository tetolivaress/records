import React from "react";
import { ActivityIndicator, Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from 'react';
import movieDB from "../api/movieDB";
import { Movie, MovieDBNowPlaying } from '../interfaces/movie';
import { ScrollView } from "react-native-gesture-handler";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import MicIcon from "react-native-bootstrap-icons/icons/mic";
import StopCircle from "react-native-bootstrap-icons/icons/stop-circle";

const HashTagsScreen = () => {

  const [hashtag, setHashtag] = useState('');
  
  const [player, setPlayer] = useState({});
  const [audio, setAudio] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  
  const [state, setstate] = useState<Movie[]>([])
  useEffect(()=>{

    // movieDB.get<MovieDBNowPlaying>('/now_playing')
    //   .then( res => {
    //     console.log(JSON.stringify(res.data, null, 3));
    //     setstate(res.data.results)
    //   });

    setPlayer(new AudioRecorderPlayer());
    return () => stopSound();

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
    player.removeRecordBackListener();
    setIsRecording(false)
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

  const toggleRecordAudio = isRecording ? onStopRecord : onStartRecord
  const toggleRecordAudioIcon = isRecording
    ? <StopCircle width="50" height="50" fill="rgb(189, 189, 189)" />
    : <MicIcon width="50" height="50" fill="rgb(189, 189, 189)" />

  return (
    <>
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
              justifyContent: 'center',
              alignItems: 'center'
            
            }}
          >
            <Text style={{color: '#fff'}}>{audio?.recordSecs}</Text>
            {toggleRecordAudioIcon}
          </TouchableOpacity>
          {
            isRecording || audio.recordSecs && (
              <TouchableOpacity
                onPress={onStartPlay}
                style={{
                  backgroundColor: '#000',
                  marginLeft: 6              
                }}
              >
                <Text style={{textAlign: 'center', color: 'white'}}>
                  Play
                </Text>
              </TouchableOpacity>

            )
          }
        </View>

        <Text>{JSON.stringify(audio, null, 4)}</Text>
        
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
          } */}
      </ScrollView>
    </>
  );
}

export default HashTagsScreen;
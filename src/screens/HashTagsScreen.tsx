import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { useEffect, useState } from 'react';
import movieDB from "../api/movieDB";
import { Movie, MovieDBNowPlaying } from '../interfaces/movie';
import { ScrollView } from "react-native-gesture-handler";


const HashTagsScreen = () => {
  
  const [state, setstate] = useState<Movie[]>([])
  useEffect(()=>{

    movieDB.get<MovieDBNowPlaying>('/now_playing')
      .then( res => {
        console.log(JSON.stringify(res.data, null, 3));
        setstate(res.data.results)
      });

  },[]);
  
  return (
    <>
      <ScrollView>
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
      </ScrollView>
    </>
  );
}

export default HashTagsScreen;
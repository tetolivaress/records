import React from "react";
import { Text } from "react-native";
import { useEffect, useState } from 'react';
import movieDB from "../api/movieDB";


const HashTagsScreen = () => {
  
  const [state, setstate] = useState('just')
  useEffect(()=>{

    movieDB.get('/now_playing')
      .then( res => {
        console.log(JSON.stringify(res.data, null, 3));
        setstate('loaded')
      });

  },[]);
  
  return (
    <Text>{state}</Text>
  );
}

export default HashTagsScreen;
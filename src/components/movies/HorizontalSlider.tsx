import React from "react";
import { Movie } from '../../interfaces/movie';
import { View, Text, FlatList } from 'react-native'
import MoviePoster from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
}

const HorizontalSlider = ({ title, movies }: Props) => {
  return (
    <View
      style={{height: 230,}}
    >
      <Text style={{ color: '#333', fontSize: 18 }}>{title}</Text>
      <FlatList
        data={movies}
        renderItem={({ item }: any) => (
          <MoviePoster
            movie={item}
            width={140}
            height={200}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
  </View>
  )
}

export default HorizontalSlider

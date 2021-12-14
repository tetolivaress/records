import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { Movie } from '../../interfaces/movie';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {

  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

  return (
    <View style={{ height, width }}>
      <View
        style={ styles.imageContainer }
      >
        <Image
          source={{ uri }}
          style={ styles.image }
        />
      </View>
    </View>
  )
}

export default MoviePoster

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 12,
  },
  container: {
    width: 300,
    height: 420,
  }
})
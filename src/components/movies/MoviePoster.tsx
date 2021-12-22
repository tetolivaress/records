import React from 'react'
import { View, Text, Image, StyleSheet, } from 'react-native';
import { Movie } from '../../interfaces/movie';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
  navigation: any;
}

const MoviePoster = ({ movie, height = 420, width = 300, navigation }: Props) => {

  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetails', movie)}
      style={[styles.imageContainer, { height, width }]}
    >
      <View
        style={ styles.imageContainer }
      >
        <Image
          source={{ uri }}
          style={ styles.image }
        />
      </View>
    </TouchableOpacity>
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
    shadowOffset: {width: -2, height: 19},
    shadowOpacity: 0.9,
    shadowRadius: 112,
    elevation: 18,
    margin: 6,
    backgroundColor: 'rgba(0,0,0,0)',
    overflow: 'hidden'
  }
})
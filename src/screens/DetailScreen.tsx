import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Movie } from '../interfaces/movie';
import { RootStackParams } from '../navigator/DrawerNavigator';
import useMovieDetails from '../hooks/useMovieDetails';
import MovieDetails from "../components/movies/MovieDetails";

const screenHeight  = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

const DetailScreen = ({ route }: Props) => {

  const movie = route.params as Movie
  const uri   = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  const { isLoading, cast, movieFull } = useMovieDetails(movie.id)

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri }}
          style={styles.posterImage}
        />
      </View>
      <View>
        <Text style={styles.title}>{movie.original_title}</Text>
        <Text style={styles.subtitle}>{movie.title}</Text>          
      </View>
      
      {isLoading
        ? <ActivityIndicator size={50} color="grey" />
        : <MovieDetails cast={cast} MovieFull={movieFull!} />
      }
    </ScrollView>
  )

}

export default DetailScreen

const styles = StyleSheet.create({
  imageContainer: {
    height: screenHeight * 0.7,
    shadowColor: 'red',
    shadowOffset: {width: -2, height: 9},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 20,    
  },
  posterImage: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  title: {
    fontSize: 18,
    marginTop: 20
  },
  subtitle: {
    fontSize: 15
  }

})
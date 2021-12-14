import React from "react";
import { ActivityIndicator, Dimensions, View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useMovies } from '../hooks/useMovies';
import MoviePoster from '../components/movies/MoviePoster'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const MoviesScreen = () => {

  const { moviesListings, isLoading: isLoadingMovies } = useMovies()
  const { top } = useSafeAreaInsets()

  const windowsWidth = Dimensions.get('window').width

  return (
    <View style={{
      flex: 1,
      marginTop: top + 20,
      backgroundColor: "#fafed7"
    }}>
      {isLoadingMovies
        ? <ActivityIndicator color="red" size={50} />
        : (
        <ScrollView>
          <View>
            <Carousel 
              data={ moviesListings }
              renderItem={({ item }: any ) => <MoviePoster movie={item} />}
              sliderWidth={windowsWidth}
              itemWidth={300}
            />          
            <View
              style={{backgroundColor: 'red', height: 230,}}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>asdasdasd</Text>
              <FlatList
                data={moviesListings}
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
            <View
              style={{backgroundColor: 'red', height: 230}}
            >
              <FlatList
                data={moviesListings}
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
          </View>
        </ScrollView>
        )
      }
      
    </View>
  )
}

export default MoviesScreen
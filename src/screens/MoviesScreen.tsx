import React, { useEffect } from "react";
import { ActivityIndicator, Dimensions, View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ImageColors from "react-native-image-colors";
import HorizontalSlider from '../components/movies/HorizontalSlider'
import GradientBackground from '../components/movies/GradientBackground';
import { useMovies } from '../hooks/useMovies';
import MoviePoster from '../components/movies/MoviePoster'
import { setColors } from '../store/slices/MoviesSlice'
import { useAppDispatch } from '../hooks/hooks';

interface MoviesColors {
  primary: string;
  secondary: string;
}

const MoviesScreen = () => {
  
  const dispatch = useAppDispatch()

  const {
    nowPlaying,
    popular,
    topRated,
    upcoming,
    isLoading: isLoadingMovies,
  } = useMovies()
  const { top } = useSafeAreaInsets()

  const windowsWidth = Dimensions.get('window').width

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index]
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

    let imageColors: MoviesColors = {
      primary: 'transparent',
      secondary: 'transparent'
    };

    const colors = await ImageColors.getColors(uri, {})

    switch (colors.platform) {
      case 'android':        
        imageColors.primary = colors.dominant ||'transparent'
        imageColors.secondary = colors.vibrant ||'transparent'
        break

      case 'ios':        
        imageColors.primary = colors.primary ||'transparent'
        imageColors.secondary = colors.secondary ||'transparent'
        break
      default:
        throw new Error('Unexpected platform key')
    }

    console.log(imageColors);

    dispatch(setColors(imageColors))
  }

  useEffect(() => {
    nowPlaying.length && getPosterColors(0)
  }, [nowPlaying])

  return (
    <GradientBackground>
      <View style={{
        flex: 1,
        marginTop: top + 20
      }}>
        {isLoadingMovies
          ? <ActivityIndicator color="red" size={50} />
          : (
          <ScrollView>
            <View>
              <Carousel 
                data={ nowPlaying }
                renderItem={({ item }: any ) => <MoviePoster movie={item} />}
                sliderWidth={windowsWidth}
                itemWidth={300}
                onSnapToItem={(i) => getPosterColors(i)}
              />          
              <HorizontalSlider movies={nowPlaying} title="Poasdasd" />
              <HorizontalSlider movies={popular} title="XXXXX" />
              <HorizontalSlider movies={topRated} title="El Mio" />
              <HorizontalSlider movies={upcoming} title="El Mio" />
            </View>
          </ScrollView>
          )
        }
        
      </View>
    </GradientBackground>
    
  )
}

export default MoviesScreen
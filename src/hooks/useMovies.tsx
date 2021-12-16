import { Movie, MovieDBResponse } from '../interfaces/movie';
import movieDB from '../api/movieDB';
import { useEffect, useState } from 'react';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [moviesState, setMoviesState] =useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  })

  const getMovies = async () => {
    try {
      const nowPlayinPromise= movieDB.get<MovieDBResponse>('/now_playing')
      const popularPromise  = movieDB.get<MovieDBResponse>('/popular')
      const topRatedPromise = movieDB.get<MovieDBResponse>('/top_rated')
      const ipcomingPromise = movieDB.get<MovieDBResponse>('/upcoming')
      
      const response = await Promise.all([
        nowPlayinPromise,
        popularPromise,
        topRatedPromise,
        ipcomingPromise
      ])

      setMoviesState({
        nowPlaying: response[0].data.results,
        popular: response[1].data.results,
        topRated: response[2].data.results,
        upcoming: response[3].data.results,
      })

      setIsLoading(false)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getMovies()
  },[])

  return { ...moviesState, isLoading }
}
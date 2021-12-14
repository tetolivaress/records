import { Movie, MovieDBNowPlaying } from '../interfaces/movie';
import movieDB from '../api/movieDB';
import { useEffect, useState } from 'react';

import { API_KEY, API_URL } from "@env";

export const useMovies = () => {

  const [ moviesListings, setMoviesListings ] = useState<Movie[]>([])
  const [isLoading, setIsLoading] =useState(true)

  const getMovies = async () => {
    try {
      const response = await movieDB.get<MovieDBNowPlaying>('/now_playing')
      const movies = response.data.results
      setMoviesListings(movies)
      setIsLoading(false)      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getMovies()
  },[])

  return {
    moviesListings,
    isLoading
  }
}
import { useEffect, useState } from "react"
import movieDB from "../api/movieDB"
import { MovieFull } from '../interfaces/movie';
import { CreditsResponse } from '../interfaces/creditsInterface';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: any[];
}

const useMovieDetails = (movieId: number) => {

  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: []
  })

  const getMovieDetails = async () => {

    const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`)
    const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`)
    
    const [moviesDetailsResponse, castResponse] = await Promise.all([
      movieDetailsPromise,
      castPromise
    ])

    setState({
      isLoading: false,
      movieFull: moviesDetailsResponse.data,
      cast: castResponse.data.cast
    })
  }

  useEffect(() => {
    setState({
      isLoading: true,
      movieFull: undefined,
      cast: []
    })
    getMovieDetails()
  },[movieId])

  return { ...state }
}

export default useMovieDetails
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface MoviesState {
  movieColors: object;
}

const initialState: MoviesState = 
  {
    movieColors: {
      primary: 'transparent',
      secondary: 'transparent'
    }
  }

export const fetchMovies = createAsyncThunk<any>(
  'people/get',
  async (_, { extra }) => {
    const people: any[] = []
    const peopleReponse = await extra.getFirebase()
      .firestore()
      .collection('expenses')
      .get()
    peopleReponse.docs.forEach(async (doc: any) => people.push(doc.data()))
    return people
  }
)

const moviesSlice = createSlice({
  name: 'people',
  initialState,  
  reducers: {
    setColors: (state, { payload }) => {
      state.movieColors = payload
    },
  },
  extraReducers: buider => {
    buider.addCase(fetchMovies.fulfilled, (state, action) => {
      console.log('ready')
      //state.data = action.payload
    }),
    buider.addCase(fetchMovies.pending, (state, action) => {
      console.log('pending')
    }),
    buider.addCase(fetchMovies.rejected, (state, action) => {
      console.log('rejected')
    })
  }
})

export default moviesSlice.reducer

export const { setColors } = moviesSlice.actions
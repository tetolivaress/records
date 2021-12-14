import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface PeopleState {
  hashtag: string,
  file: any
  data: any,
}

const initialState: PeopleState = 
  {
    hashtag: '',
    file: null,
    data: [],
  }

export const fetchPeople = createAsyncThunk<any>(
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

const peopleSlice = createSlice({
  name: 'people',
  initialState,  
  reducers: {},
  extraReducers: buider => {
    buider.addCase(fetchPeople.fulfilled, (state, action) => {
      console.log('ready')
      state.data = action.payload
    }),
    buider.addCase(fetchPeople.pending, (state, action) => {
      console.log('pending')
    }),
    buider.addCase(fetchPeople.rejected, (state, action) => {
      console.log('rejected')
    })
  }
})

export default peopleSlice.reducer
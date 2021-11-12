import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getFirebase } from 'react-redux-firebase';

export interface RecordsState {
  hashtag: string,
  file: any
}

const initialState: RecordsState[] = [
  {
    hashtag: '',
    file: null
  },
  {
    hashtag: 'wwwwwwww',
    file: null
  }
]

export const fetchRecords = createAsyncThunk<any>(
  'records/set',
  async (_, { extra }) => {
    const records: any[] = []
    console.log(extra)
    const recordsReponse = await extra.getFirebase()
      .firestore()
      .collection('people')
      .get()

      recordsReponse.docs.forEach(async (doc: any) => records.push(doc.data()))
    console.log(records)
    return records
  }
)

const recordsSlice = createSlice({
  name: 'records',
  initialState,  
  reducers: {},
  extraReducers: buider => {
    buider.addCase(fetchRecords.fulfilled, (state, action) => {
      console.log(state, action)
    })
  }
})

export default recordsSlice.reducer
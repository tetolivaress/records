import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export type RecordsState = {
  data: any[]
}

const initialState: RecordsState = {
  data: [],
}

export const fetchRecords = createAsyncThunk<any>(
  'records/get',
  async (_, { extra }) => {
    const records: any[] = []
    const recordsReponse = await extra.getFirebase()
      .firestore()
      .collection('records')
      .get()
    recordsReponse.docs.forEach(async (doc: any) => records.push(doc.data()))
    return records
  }
)

const recordsSlice = createSlice({
  name: 'records',
  initialState,  
  reducers: {},
  extraReducers: buider => {
    buider.addCase(fetchRecords.fulfilled, (state, action) => {
      console.log('ready')
      state.data = action.payload
    }),
    buider.addCase(fetchRecords.pending, () => {
      console.log('pending')
    }),
    buider.addCase(fetchRecords.rejected, () => {
      console.log('rejected')
    })
  }
})

export default recordsSlice.reducer

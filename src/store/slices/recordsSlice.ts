import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export type RecordsState = {
  data: any[]
}

const initialState: RecordsState = {
  data: [],
}

const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(','),
  mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), 
  n = bstr.length, 
  u8arr = new Uint8Array(n);
  
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
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

export const sendCompleteRecord = createAsyncThunk<any>(
  'records/set',
  async (record, { extra: { getFirebase } }) => {
    //console.log(record)
    const records: any[] = []
    console.log(record)


    try {
      const recordsRef = await getFirebase().storage().ref(`records/${new Date()}.mp4`)
      const audioTask = await recordsRef.putFile(record.b64Audio)
      
      const imagesRef = await getFirebase().storage().ref(`recordImages/${new Date()}.jpg`)
      const imageTask = await imagesRef.putFile(record.b64Image)

      await getFirebase().firestore().collection('records').add({
        color: record.selectedColor,
        record: audioTask.downloadURL || '',
        image: imageTask.downloadURL,
        hashtag: record.hashtag,
        liked: 0,
        disliked: 0
      })

      const recordsReponse = await getFirebase()
        .firestore()
        .collection('records')
        .get()

      recordsReponse.docs.forEach(async (doc: any) => records.push(doc.data()))
      
      return records

    } catch (error) {
      console.log(error)
    }
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
    }),
    
    buider.addCase(sendCompleteRecord.fulfilled, (state, action) => {
      state.data = action.payload
    }),
    buider.addCase(sendCompleteRecord.pending, () => {
      console.log('pending')
    }),
    buider.addCase(sendCompleteRecord.rejected, () => {
      console.log('rejected')
    })
  }
})

export default recordsSlice.reducer

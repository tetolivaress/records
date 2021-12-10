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
  async (record, { extra }) => {
    //console.log(record)
    const records: any[] = []
    console.log(record)


    try {
      let storageRef = await extra.getFirebase().storage().ref('record')
      console.log(1)

      const imageTask = await storageRef.putFile(record.b64Image)
      console.log(4)
  
      const imagePath = await imageTask.task.snapshot.ref.getDownloadURL()
      console.log(5)

      const file = dataURLtoFile('data:audio/mpeg;base64,' + record.b64Audio, 'jeje.mp4')

      const audioTask = await storageRef.putFile(file)
      console.log(2)
  
      const audioPath = await audioTask.task.snapshot.ref.getDownloadURL()
      console.log(3)
  
      
      return { audioPath, imagePath }

    } catch (error) {
      console.log(error)
    }

    // const recordsReponse = await getFirebase()
    //   .firestore()
    //   .collection('records')
    //   .get()
    // recordsReponse.docs.forEach(async (doc: any) => records.push(doc.data()))
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
      console.log('ready')
      console.log(action.payload)
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

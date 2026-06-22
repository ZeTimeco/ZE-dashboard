import { addWaitlist, getWaitingList, getwaitlistAnalysis } from "@/redux/api/Pending_List/Pending_ListApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getwaitlistAnalysisThunk = createAsyncThunk('PendingList/getwaitlistAnalysis',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getwaitlistAnalysis()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getWaitingListThunk = createAsyncThunk('PendingList/getWaitingList',
  async(params = {} , {rejectWithValue})=>{
    try{
      const response = await getWaitingList(params)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addWaitlistThunk = createAsyncThunk('PendingList/addWaitlist',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await addWaitlist(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)








const initialState = {
  loading:false,
  error:null,
  getwaitlistAnalysis:null,
  getWaitingList:[],


}


const Pending_ListSlice = createSlice({
  name:'PendingList' , 
  initialState ,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
      //getwaitlistAnalysisThunk
      .addCase(getwaitlistAnalysisThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getwaitlistAnalysisThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getwaitlistAnalysis = action.payload; 
        state.error = null;
      })
      .addCase(getwaitlistAnalysisThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getWaitingListThunk
      .addCase(getWaitingListThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getWaitingListThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getWaitingList = action.payload; 
        state.error = null;
      })
      .addCase(getWaitingListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //addWaitlistThunk
      .addCase(addWaitlistThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(addWaitlistThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(addWaitlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
  }
})
export const {} = Pending_ListSlice.actions;

export default Pending_ListSlice.reducer;
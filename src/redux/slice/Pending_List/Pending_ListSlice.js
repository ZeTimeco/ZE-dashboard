import { getwaitlistAnalysis } from "@/redux/api/Pending_List/Pending_ListApi";
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

const initialState = {
  loading:false,
  error:null,
  getwaitlistAnalysis:null,

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
  }
})
export const {} = Pending_ListSlice.actions;

export default Pending_ListSlice.reducer;
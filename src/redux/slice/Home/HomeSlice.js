import { getBookingNew, getBookingOngoing, getProviderRate, getProviderState, setModuleId } from "@/redux/api/Home/HomeApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//add or update module
export const setModuleIdThunk = createAsyncThunk('Home/setModuleIdThunk',
  async(module_id  , {rejectWithValue})=>{
    try{
      const response = await setModuleId(module_id )
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to add or update module ");
    }
  }
)

export const getProviderStateThunk = createAsyncThunk('Home/getProviderStateThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getProviderState()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch provider state");
    }
  }
)

export const getProviderRateThunk = createAsyncThunk('Home/getProviderRateThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getProviderRate()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch provider ratings");
    }
    }
)

export const getBookingNewThunk = createAsyncThunk('Home/getBookingNewThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getBookingNew()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch new bookings");
    }
  }
)

export const getBookingOngoingThunk = createAsyncThunk('Home/getBookingOngoingThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getBookingOngoing()
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to fetch ongoing bookings");
    }
  }
)

const initialState = {
  loading:false,
  error:null,
  moduleId:'',
  providerState:null,
  providerRate:[],
  newBookings:[],
  ongoingBookings:[],



}

const homeSlice = createSlice({
  name:'Home' , 
  initialState ,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
      //setModuleIdThunk
      .addCase(setModuleIdThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(setModuleIdThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.moduleId = action.payload; 
        state.error = null;
      })
      .addCase(setModuleIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getProviderStateThunk
      .addCase(getProviderStateThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getProviderStateThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.providerState = action.payload; 
        state.error = null;
      })
      .addCase(getProviderStateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getProviderRateThunk
      .addCase(getProviderRateThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getProviderRateThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.providerRate = action.payload; 
        state.error = null;
      })
      .addCase(getProviderRateThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getBookingNewThunk
      .addCase(getBookingNewThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getBookingNewThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.newBookings = action.payload; 
        state.error = null;
      })
      .addCase(getBookingNewThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getBookingOngoingThunk
      .addCase(getBookingOngoingThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getBookingOngoingThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.ongoingBookings = action.payload; 
        state.error = null;
      })
      .addCase(getBookingOngoingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      
  }
})
export const {} = homeSlice.actions;

export default homeSlice.reducer;
import { EditHall, getHallById, getHalls, getHallType } from "@/redux/api/Halls/HallsApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getHallsThunk = createAsyncThunk('halls/getHalls',
  async(_ , {rejectWithValue})=>{
    try {
      const response = await getHalls();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getHallTypeThunk = createAsyncThunk('halls/getHallType',
  async(_ , {rejectWithValue})=>{
    try {
      const response = await getHallType();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getHallByIdThunk = createAsyncThunk('halls/getHallById',
  async(id , {rejectWithValue})=>{
    try {
      const response = await getHallById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const EditHallThunk = createAsyncThunk('halls/EditHall',
  async(formData , {rejectWithValue})=>{
    try {
      const response = await EditHall(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)



const initailState = {
  loading:false,
  error:null,
  halls:[],
  getHallType:[],
  getHallById:null,
}

const HallsSlice =createSlice({
  name:'Halls',
  initialState:initailState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
      //getHallsThunk
      .addCase(getHallsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHallsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.halls = action.payload;
      })
      .addCase(getHallsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getHallTypeThunk
      .addCase(getHallTypeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHallTypeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getHallType = action.payload;
      })
      .addCase(getHallTypeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getHallByIdThunk
      .addCase(getHallByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHallByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getHallById = action.payload;
      })
      .addCase(getHallByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //EditHallThunk
      .addCase(EditHallThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditHallThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(EditHallThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  }
})

export const {} = HallsSlice.actions;
export default HallsSlice.reducer;
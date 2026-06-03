import { AddHall, dublicateHall, EditHall, getHallById, getHalls, getHallType, toggleViews } from "@/redux/api/Halls/HallsApi";
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
  async({ id, data } , {rejectWithValue})=>{
    try {
      const response = await EditHall(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const AddHallThunk = createAsyncThunk('halls/AddHall',
  async(formData , {rejectWithValue})=>{
    try {
      const response = await AddHall(formData);
      return response;
    } catch (error) { 
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const toggleViewsThunk = createAsyncThunk('halls/toggleViews',
  async(id , {rejectWithValue})=>{
    try {
      const response = await toggleViews(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    } 
  }
)

export const dublicateHallThunk = createAsyncThunk('halls/dublicateHall',
  async(formData , {rejectWithValue})=>{
    try {
      const response = await dublicateHall(formData);
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
      //AddHallThunk
      .addCase(AddHallThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddHallThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AddHallThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //toggleViewsThunk
      .addCase(toggleViewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleViewsThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(toggleViewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //dublicateHallThunk
      .addCase(dublicateHallThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dublicateHallThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(dublicateHallThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  }
})

export const {} = HallsSlice.actions;
export default HallsSlice.reducer;
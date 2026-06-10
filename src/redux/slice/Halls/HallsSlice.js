import { AddHall, addTable, DeleteTable, dublicateHall, EditHall, EditRestaurantTable, getHallById, getHalls, getHallsView, getHallType, getRestaurantTable, getTables, getTage, toggleViews } from "@/redux/api/Halls/HallsApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/*********hall */
//--------------

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

/*********Tables */
//----------------

export const getTablesThunk = createAsyncThunk('halls/getTables',
  async(id , {rejectWithValue})=>{
    try{
      const response = await getTables(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addTableThunk = createAsyncThunk('halls/addTable' , 
  async({ id, formData } , {rejectWithValue})=>{
    try{
      const response = await addTable(id, formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getTageThunk = createAsyncThunk('halls/getTage',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getTage()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getHallsViewThunk = createAsyncThunk('halls/getHallsView',
  async(id, {rejectWithValue})=>{
    try{
      const response = await getHallsView(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getRestaurantTableThunk = createAsyncThunk('halls/getRestaurantTable',
  async(id, {rejectWithValue})=>{
    try{
      const response = await getRestaurantTable(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const EditRestaurantTableThunk = createAsyncThunk('halls/EditRestaurantTable',
  async({id , formData}, {rejectWithValue})=>{
    try{
      const response = await EditRestaurantTable(id , formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const DeleteTableThunk = createAsyncThunk('halls/DeleteTable',
  async(Tableid , {rejectWithValue})=>{
    try{
      const response = await DeleteTable(Tableid)
      return response
    }catch(error){
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
  getTables:[],
  getTage:[],
  getHallsView:[],
  getRestaurantTable:null,
  DeleteTable:[],


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
      //getTablesThunk
      .addCase(getTablesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTablesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getTables = action.payload;
      })
      .addCase(getTablesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //addTableThunk
      .addCase(addTableThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTableThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTableThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getTageThunk
      .addCase(getTageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getTage = action.payload;
      })
      .addCase(getTageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getHallsViewThunk
      .addCase(getHallsViewThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHallsViewThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getHallsView = action.payload;
      })
      .addCase(getHallsViewThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getRestaurantTableThunk
      .addCase(getRestaurantTableThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurantTableThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getRestaurantTable = action.payload;
      })
      .addCase(getRestaurantTableThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //EditRestaurantTableThunk
      .addCase(EditRestaurantTableThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditRestaurantTableThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(EditRestaurantTableThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //DeleteTableThunk
      .addCase(DeleteTableThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteTableThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.DeleteTable = action.payload;
      })
      .addCase(DeleteTableThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  }
})

export const {} = HallsSlice.actions;
export default HallsSlice.reducer;
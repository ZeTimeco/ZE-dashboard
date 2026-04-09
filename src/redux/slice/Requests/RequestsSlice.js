import { assignHandyman, getAllBookingProperty, getAvailableHandymen, getBookingByID, getBookingByIdProperty, getBookings, getDrowpdownFilters, getRejectionReasons, UpdateBooking } from "@/redux/api/Requests/RequestsApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//Home-Car-Street_module
//************************************************* */

export const getBookingsThunk = createAsyncThunk('Requests/getBookingsThunk',
  async(filters = {} , {rejectWithValue})=>{
    try{
      const response =await getBookings(filters)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get bookings data");
    }
  }
)

export const getDrowpdownFiltersThunk = createAsyncThunk('Requests/getDrowpdownFiltersThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getDrowpdownFilters()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get drowpdown filters data");
    }
  }
)

export const getBookingByIDThunk = createAsyncThunk('Requests/getBookingByIDThunk' ,
  async(id,{rejectWithValue})=>{
    try{
      const response= await getBookingByID(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of booking by ID ");
    }
  }
)

export const getAvailableHandymenThunk = createAsyncThunk('Requests/getAvailableHandymenThunk' ,
  async(formData,{rejectWithValue})=>{
    try{
      const response= await getAvailableHandymen(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of available handymen");
    }
  } 
)

export const assignHandymanThunk = createAsyncThunk('Requests/assignHandymanThunk' ,
  async(formData,{rejectWithValue})=>{
    try{
      const response= await assignHandyman(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to assign handyman");
    } 
  }
)

export const UpdateBookingThunk = createAsyncThunk('Requests/UpdateBookingThunk' ,
  async({id, formData},{rejectWithValue})=>{
    try{
      const response= await UpdateBooking(id, formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to update booking");
    } 
  }
)

export const getRejectionReasonsThunk = createAsyncThunk('Requests/getRejectionReasonsThunk' ,
  async(_,{rejectWithValue})=>{
    try{
      const response= await getRejectionReasons()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of rejection reasons");
    }
  }
)

//property_module
//************************************************* */
export const getAllBookingPropertyThunk = createAsyncThunk('Requests/getAllBookingPropertyThunk',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getAllBookingProperty()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of bookings");

    }
  }
)

export const getBookingByIdPropertyThunk = createAsyncThunk('Requests/getBookingByIdPropertyThunk',
  async(id , {rejectWithValue})=>{
    try{
      const response = await getBookingByIdProperty(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || "Failed to get data of booking");
    }
  }
)


const initialState = {
  loading: false,
  error: null,
  bookings:[],
  pagination: null,
  filterData:[],
  bookingDetails:null,
  availableHandymen: [],
  assignHandymanResponse: null,
  bookingDetails:null,
  RejectionReasons: [],


  getBooking:[],
  getBookingDetails:null,

}

const RequestsSlice = createSlice({
  name:'Requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder 
      //getBookingsThunk
      .addCase(getBookingsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.pagination = action.payload?.pagination || null;
      })
      .addCase(getBookingsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getDrowpdownFiltersThunk
      .addCase(getDrowpdownFiltersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDrowpdownFiltersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.filterData = action.payload;
      })
      .addCase(getDrowpdownFiltersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getBookingByIDThunk
      .addCase(getBookingByIDThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingByIDThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload.booking;
      })
      .addCase(getBookingByIDThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getAvailableHandymenThunk
      .addCase(getAvailableHandymenThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAvailableHandymenThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.availableHandymen = action.payload.handymen || [];
      })
      .addCase(getAvailableHandymenThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //assignHandymanThunk
      .addCase(assignHandymanThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignHandymanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.assignHandymanResponse = action.payload;
      })
      .addCase(assignHandymanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //UpdateBookingThunk
      .addCase(UpdateBookingThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateBookingThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload;
      })
      .addCase(UpdateBookingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getRejectionReasonsThunk
      .addCase(getRejectionReasonsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRejectionReasonsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.RejectionReasons = action.payload.data;
      })
      .addCase(getRejectionReasonsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })


      //getAllBookingPropertyThunk
      .addCase(getAllBookingPropertyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookingPropertyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getBooking = action.payload;
      })
      .addCase(getAllBookingPropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //getBookingByIdPropertyThunk
      .addCase(getBookingByIdPropertyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingByIdPropertyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getBookingDetails = action.payload;
      })
      .addCase(getBookingByIdPropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  }
})

export default RequestsSlice.reducer;
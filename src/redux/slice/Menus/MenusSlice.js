import { getCategories } from "@/redux/api/Menus/MenusApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getCategoriesThunk = createAsyncThunk('Menus/getCategories',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getCategories();
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }

  }
)



const initialState = {
  loading:false,
  error:null,
  getCategories:[],

}

const MenusSlice = createSlice({
  name:'Menus' , 
  initialState ,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
      //getCategoriesThunk
      .addCase(getCategoriesThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getCategoriesThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getCategories = action.payload; 
        state.error = null;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
  }
})

export const {} = MenusSlice.actions;

export default MenusSlice.reducer;
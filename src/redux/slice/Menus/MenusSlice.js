import { addCategory, getCategories, getItems, getItemById, getItemsDetails, addItem, showFullItem, editItem, showFullCategory, editCategory, deleteItem, getMenuStatistics, getMenus, getProductDetails, toggleAvailability, updateStatuses, DeleteItem, ShowFullItem, updateItem, getCategoriesMenu, addItems, getCategoriesList, getCategoryDetails, editCategoryMenu, toggleVisibility, addCategoryMenu } from "@/redux/api/Menus/MenusApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getCategoriesThunk = createAsyncThunk('Menus/getCategories',
  async(page = 1, {rejectWithValue})=>{
    try{
      const response = await getCategories(page);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getItemsThunk = createAsyncThunk('Menus/getItems',
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getItems();
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addCategoryThunk = createAsyncThunk('Menus/addCategory',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await addCategory(formData);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const getItemByIdThunk = createAsyncThunk('Menus/getItemById',
  async(id , {rejectWithValue})=>{
    try{
      const response = await getItemById(id);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const getItemsDetailsThunk = createAsyncThunk('Menus/getItemsDetails',
  async(id , {rejectWithValue})=>{
    try{
      const response = await getItemsDetails(id);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const addItemThunk = createAsyncThunk('Menus/addItem',
  async(FormData , {rejectWithValue})=>{
    try{
      const response = await addItem(FormData);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const showFullItemThunk = createAsyncThunk('Menus/showFullItem',
  async(id , {rejectWithValue})=>{
    try{
      const response = await showFullItem(id);
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const editItemThunk = createAsyncThunk('Menus/editItem',
  async({id , formData} , {rejectWithValue})=>{
    try{
      const response = await editItem(id , formData);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const showFullCategoryThunk = createAsyncThunk('Menus/showFullCategory',
  async(id , {rejectWithValue})=>{
    try{
      const response = await showFullCategory(id);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const editCategoryThunk = createAsyncThunk('Menus/editCategory',
  async({id , formData} , {rejectWithValue})=>{
    try{
      const response = await editCategory(id , formData);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

export const deleteItemThunk = createAsyncThunk('Menus/deleteItem',
  async(id , {rejectWithValue})=>{
    try{
      const response = await deleteItem(id);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }  
  }
)

/***************************************************** */
//Food delivery

export const getMenuStatisticsThunk = createAsyncThunk('Menu/getMenuStatistics' , 
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getMenuStatistics()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getMenusThunk = createAsyncThunk('Menu/getMenus' , 
  async(search , {rejectWithValue})=>{
    try{
      const response = await getMenus(search)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getProductDetailsThunk = createAsyncThunk('Menu/getProductDetails' , 
  async(itemID , {rejectWithValue})=>{
    try{
      const response = await getProductDetails(itemID)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const toggleAvailabilityThunk = createAsyncThunk('Menu/toggleAvailability' , 
  async(itemID , {rejectWithValue})=>{
    try{
      const response = await toggleAvailability(itemID)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const updateStatusesThunk = createAsyncThunk('Menu/updateStatuses' , 
  async(formData , {rejectWithValue})=>{
    try{
      const response = await updateStatuses(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const DeleteItemThunk = createAsyncThunk('Menu/DeleteItem' , 
  async(itemID , {rejectWithValue})=>{
    try{
      const response = await DeleteItem(itemID)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)


export const ShowFullItemThunk = createAsyncThunk('Menu/ShowFullItem' , 
  async(itemID , {rejectWithValue})=>{
    try{
      const response = await ShowFullItem(itemID)
      return response.data
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const updateItemThunk = createAsyncThunk('Menu/updateItem' , 
  async({itemID , formData} , {rejectWithValue})=>{
    try{
      const response = await updateItem({itemID , formData})
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getCategoriesMenuThunk = createAsyncThunk('Menu/getCategoriesMenu' , 
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getCategoriesMenu()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addItemsThunk = createAsyncThunk('Menu/addItems' , 
  async({formData} , {rejectWithValue})=>{
    try{
      const response = await addItems({formData})
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getCategoriesListThunk = createAsyncThunk('Menu/getCategoriesList' , 
  async(_ , {rejectWithValue})=>{
    try{
      const response = await getCategoriesList()
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getCategoryDetailsThunk = createAsyncThunk('Menu/getCategoryDetails' , 
  async(id , {rejectWithValue})=>{
    try{
      const response = await getCategoryDetails(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const editCategoryMenuThunk = createAsyncThunk('Menu/editCategoryMenu' , 
  async({id , formData} , {rejectWithValue})=>{
    try{
      const response = await editCategoryMenu({id , formData})
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const toggleVisibilityThunk = createAsyncThunk('Menu/toggleVisibility' , 
  async(id , {rejectWithValue})=>{
    try{
      const response = await toggleVisibility(id)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const addCategoryMenuThunk = createAsyncThunk('Menu/addCategoryMenu' , 
  async(formData , {rejectWithValue})=>{
    try{
      const response = await addCategoryMenu(formData)
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

const initialState = {
  loading: false,
  error: null,
  getCategories: [],
  categoriesMeta: {
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1
  },
  getItems: [],
  getItemById : [],
  getItemsDetails:null,
  showFullItem:null,
  showFullCategory:null,

  getMenuStatistics:null,
  getMenus:[],
  getProductDetails:null,
  ShowFullItem:null,
  getCategoriesMenu:[],
  getCategoriesList:[],
  getCategoryDetails:null




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
        state.getCategories = action.payload.data;      
        state.categoriesMeta = action.payload.meta;     
        state.error = null;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getItemsThunk
      .addCase(getItemsThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getItemsThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getItems = action.payload; 
        state.error = null;
      })
      .addCase(getItemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //addCategoryThunk
      .addCase(addCategoryThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(addCategoryThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getItemByIdThunk
      .addCase(getItemByIdThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getItemByIdThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getItemById = action.payload; 
        state.error = null;
      })
      .addCase(getItemByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getItemsDetailsThunk
      .addCase(getItemsDetailsThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getItemsDetailsThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getItemsDetails = action.payload; 
        state.error = null;
      })
      .addCase(getItemsDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //addItemThunk
      .addCase(addItemThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(addItemThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(addItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //showFullItemThunk
      .addCase(showFullItemThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(showFullItemThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.showFullItem = action.payload; 
        state.error = null;
      })
      .addCase(showFullItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //editItemThunk
      .addCase(editItemThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(editItemThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(editItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //showFullCategoryThunk
      .addCase(showFullCategoryThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(showFullCategoryThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.showFullCategory = action.payload; 
        state.error = null;
      })
      .addCase(showFullCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //editCategoryThunk
      .addCase(editCategoryThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(editCategoryThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(editCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //deleteItemThunk
      .addCase(deleteItemThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(deleteItemThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getMenuStatisticsThunk
      .addCase(getMenuStatisticsThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getMenuStatisticsThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getMenuStatistics = action.payload; 
        state.error = null;
      })
      .addCase(getMenuStatisticsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getMenusThunk
      .addCase(getMenusThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getMenusThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getMenus = action.payload; 
        state.error = null;
      })
      .addCase(getMenusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getProductDetailsThunk
      .addCase(getProductDetailsThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getProductDetailsThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getProductDetails = action.payload; 
        state.error = null;
      })
      .addCase(getProductDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //toggleAvailabilityThunk
      .addCase(toggleAvailabilityThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(toggleAvailabilityThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(toggleAvailabilityThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //updateStatusesThunk
      .addCase(updateStatusesThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(updateStatusesThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(updateStatusesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //DeleteItemThunk
      .addCase(DeleteItemThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(DeleteItemThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(DeleteItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //ShowFullItemThunk
      .addCase(ShowFullItemThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(ShowFullItemThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.ShowFullItem = action.payload; 
        state.error = null;
      })
      .addCase(ShowFullItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //updateItemThunk
      .addCase(updateItemThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(updateItemThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(updateItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getCategoriesMenuThunk
      .addCase(getCategoriesMenuThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getCategoriesMenuThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getCategoriesMenu = action.payload; 
        state.error = null;
      })
      .addCase(getCategoriesMenuThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //addItemsThunk
      .addCase(addItemsThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(addItemsThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(addItemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getCategoriesListThunk
      .addCase(getCategoriesListThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getCategoriesListThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getCategoriesList = action.payload; 
        state.error = null;
      })
      .addCase(getCategoriesListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //getCategoryDetailsThunk
      .addCase(getCategoryDetailsThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(getCategoryDetailsThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.getCategoryDetails = action.payload; 
        state.error = null;
      })
      .addCase(getCategoryDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //editCategoryMenuThunk
      .addCase(editCategoryMenuThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(editCategoryMenuThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(editCategoryMenuThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //toggleVisibilityThunk
      .addCase(toggleVisibilityThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(toggleVisibilityThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(toggleVisibilityThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      //addCategoryMenuThunk
      .addCase(addCategoryMenuThunk.pending , (state)=>{
        state.loading =true,
        state.error = null
      })
      .addCase(addCategoryMenuThunk.fulfilled , (state , action)=>{
        state.loading = false;
        state.error = null;
      })
      .addCase(addCategoryMenuThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
  }
})

export const {} = MenusSlice.actions;

export default MenusSlice.reducer;
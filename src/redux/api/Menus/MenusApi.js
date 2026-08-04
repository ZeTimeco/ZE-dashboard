import API from "../../../../config/api"


export const getCategories = async(page = 1)=>{
  const response = await API.get('/provider/menu-categories', {
    params: { page }
  })
  return response.data
}

export const getItems = async()=>{
  const response = await API.get('/provider/menu-items')
  return response.data
}

export const addCategory = async(formData)=>{
  const response = await API.post('/provider/menu-categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const getItemById = async(id)=>{
  const response = await API.get(`/provider/menu-item/menu-categories/${id}`)
  return response.data
}

export const getItemsDetails = async(id)=>{
  const response = await API.get(`/provider/menu-items/${id}`)
  return response.data
}


export const addItem = async(formData)=>{
  const response = await API.post('/provider/menu-items/create',formData,{
    headers: { 'Content-Type': 'multipart/form-data' },
  }
  )
  return response.data
}


export const showFullItem =async (id)=>{
  const response = await API.get(`/provider/menu-item/showFull/${id}`)
  return response.data
}

export const editItem =async (id , formData)=>{
  const response = await API.post(`/provider/menu-items/${id}` , formData , {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const showFullCategory =async (id)=>{
  const response = await API.get(`/provider/menu-categories/${id}`)
  return response.data
}

export const editCategory =async (id , formData)=>{
  const response = await API.post(`/provider/menu-categories/${id}` , formData , {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}


export const deleteItem =async (id)=>{
  const response = await API.delete(`/provider/menu-items/delete/${id}`)
  return response.data
}

/************************************************************** */
//Food delivery

export const getMenuStatistics = async()=>{
  const response = await API.get(`/provider/food-delivery/menu-config/menu-statistics`)
  return response.data
}

export const getMenus = async(search)=>{
  const response = await API.get(`/provider/food-delivery/menu-config/menue`, {
    params: search ? { search } : undefined
  })
  return response.data
}

export const getProductDetails = async(itemID)=>{
  const response = await API.get(`/provider/food-delivery/product-details/${itemID}`)
  return response.data
}

export const toggleAvailability = async(itemID)=>{
  const response = await API.post(`/provider/food-delivery/menu-config/toggle-availability/${itemID}`)
  return response.data
}

export const updateStatuses = async(formData)=>{
  const response = await API.post(`/provider/food-delivery/manage/menu-items/update-statuses` ,formData )
  return response.data
}

export const DeleteItem = async(itemID)=>{
  const response = await API.delete(`/provider/menu-items/delete/${itemID}`)
  return response.data
}

export const ShowFullItem = async(itemID)=>{
  const response = await API.get(`/provider/menu-item/showFull/${itemID}`)
  return response.data
}

export const updateItem = async ({ itemID, formData }) => {
  const response = await API.post(`/provider/menu-items/${itemID}`,
    formData,
    {headers: {"Content-Type": "multipart/form-data"}}
  );
  return response.data;
};

export const getCategoriesMenu = async()=>{
  const response = await API.get(`/provider/menu-categories`)
  return response.data
}

export const addItems = async ({formData }) => {
  const response = await API.post(`/provider/menu-items/create`,
    formData,
    {headers: {"Content-Type": "multipart/form-data"}}
  );
  return response.data;
};

export const getCategoriesList = async (page = 1) => {
  const response = await API.get('/provider/menu-categories', {
    params: { page },
  });
  return response.data;
};

export const getCategoryDetails = async(id)=>{
  const response = await API.get(`/provider/menu-categories/${id}`)
  return response.data
}

export const editCategoryMenu = async ({ id, formData }) => {
  const response = await API.post(`/provider/menu-categories/${id}`,
    formData,
    {headers: {"Content-Type": "multipart/form-data"}}
  );
  return response.data;
}

export const toggleVisibility = async(id)=>{
  const response = await API.post(`/provider/menu-categories/toggleVisibility/${id}`)
  return response.data
}


export const addCategoryMenu = async (formData) => {
  const response = await API.post('/provider/menu-categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}



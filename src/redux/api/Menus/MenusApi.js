import API from "../../../../config/api"


export const getCategories = async()=>{
  const response = await API.get('/provider/menu-categories')
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
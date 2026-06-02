import API from "../../../../config/api"


export const getHalls = async()=>{
  const response = await API.get('/provider/hall')
  return response.data;
}

export const getHallType = async()=>{
  const response = await API.get('/provider/hall/type')
  return response.data;
}

export const getHallById = async(id)=>{
  const response = await API.get(`/provider/restaurant/hall/${id}`)
  return response.data;
}

export const EditHall = async(formData)=>{
  const response = await API.post(`/provider/restaurant/hall/${formData.id}`, formData)
  return response.data;
}
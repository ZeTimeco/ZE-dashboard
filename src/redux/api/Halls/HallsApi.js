import API from "../../../../config/api"

/*********Hall */
//----------------

export const getHalls = async () => {
  const response = await API.get('/provider/hall')
  return response.data;
}

export const getHallType = async () => {
  const response = await API.get('/provider/hall/type')
  return response.data;
}

export const getHallById = async (id) => {
  const response = await API.get(`/provider/restaurant/hall/${id}`)
  return response.data;
}

export const EditHall = async (id, data) => {
  const response = await API.post(`/provider/restaurant/hall/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export const AddHall = async (formData) => {
  const response = await API.post('/provider/restaurant/hall', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export const toggleViews = async (id) => {
  console.log("PATCH REQUEST:", id);
  const response = await API.patch(`/provider/views/${id}/toggle`)
  return response.data;
}

export const dublicateHall = async (formData) => {
  const response = await API.post('/provider/dublicate-hall', formData)
  return response.data;
}

/*********Tables */
//----------------
export const getTables = async(id)=>{
  const response = await API.get(`/provider/restaurant/tables/hall/${id}`)
  return response.data
}
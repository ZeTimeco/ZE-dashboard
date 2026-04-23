import API from "../../../../config/api";



//Home-Car-****************************************************
//************************************************* */
//*********************************************************************** */

export const getAllServices = async (params = {}) => {
  const response = await API.get("/provider/services", {
    params: params,
  });
  return response.data; 
};

// Get service by ID(Details & Evaluation)
export const getServiceById = async (service_id) => {
  const response = await API.get(`/provider/services/${service_id}`);
  return response.data;
};

// Get service by ID(Analysis)
export const getServiceAnalysisById = async (service_id) => {
  const response = await API.get(`/provider/service-analysis/${service_id}`);
  return response.data;
}

/**Add service list**/
// Get modules
export const getmodules = async()=>{
  const response = await API.post('/getModules');
  return response.data.modules;
};

// Get categories
export const getCategories = async(module_id)=>{
  const response = await API.post('/getCategories' , { module_id });
  return response.data.categories;
};

//Get areas
export const getAllAreas = async()=>{
  const response = await API.get('/provider/getAllAreas')
  return response.data
}
/******************* */

//add service 
export const AddService = async (formData) => {
  const response = await API.post('/provider/services', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // console.log('AddService',response.data);
  return response.data;
}

//update service by id 
export const updateService = async (service_id , formData)=>{
  const response = await API.post(`/provider/services/${service_id}` ,formData , {
      headers: { 'Content-Type': 'multipart/form-data' },
  } );
  console.log('updateService',response.data);
  return response.data
}

//delete service
export const deleteService = async (service_id) => {
  const response = await API.delete(`/provider/services/${service_id}`);
  return response.data;
};




//street assistant*******************************************************
/* ************************** *****************************************/
//**************************************************************************** */

export const getStreetServiceById =async()=>{
  const response = await API.get('/street_assistant/services')
  return response.data
}

export const getFuelPrices = async()=>{
  const response = await API.get('/street_assistant/getFuelPrices')
  return response.data
}

export const getActiveFuelTypes = async()=>{
  const response = await API.get('/street_assistant/getActiveFuelTypes')
  return response.data
}

export const deleteFuelPrice = async(id)=>{
  const response = await API.post('/street_assistant/deleteFuelPrice',{id})
  return response.data;
}

export const updateServiceSetting = async(formData)=>{
  const response = await API.post('/street-assistant/update-service-setting', formData)
  return response.data
}

export const updateServiceSettingStatus = async(formData)=>{
  const response = await API.post('/street-assistant/update-service-setting-status',formData)
  return response.data
}

export const streetAssistantStatus = async(formData)=>{
  const response = await API.post('/provider/street-assistant-status', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const createFuelPrice = async(formData)=>{
  const response = await API.post('/street_assistant/createFuelPrice',formData)
  return response.data
}

export const updateFuelPrice = async(formData)=>{
  const response = await API.post('/street_assistant/updateFuelPrice',formData)
  return response.data  
}


//Property*******************************************************
/* ************************** *****************************************/
//**************************************************************************** */

export const getAllProperties = async(params = {}) => {
  const response = await API.get('/get_all/properties', { params })
  return response.data
}

export const changeStatusById = async(property_id , status)=>{
  const response = await API.patch(`/provider/properties/${property_id}/status` , {status})
  return response.data
}

export const deletePropertyItem = async (id)=>{
  const response = await API.delete(`/properties/${id}/delete`)
  return response.data
}

export const getPropertyTypes = async()=>{
  const response = await API.get('/property-types')
  return response.data
}

export const getPropertiesCities = async()=>{
  const response = await API.get('/properties/cities')
  return response.data
}

export const getAllDetails = async(id)=>{
  const response = await API.get(`/properties/${id}/allDetails`)
  return response.data
}

export const getPropertyCalendar = async(id, month)=>{
  const response = await API.get(`/properties/${id}/calendar`, {
    params: { month }
  })
  return response.data
}

export const getRoomTypes = async()=>{
  const response = await API.get('/room-types')
  return response.data
}

export const getBedTypes = async()=>{
  const response = await API.get('/bed-types')
  return response.data
}

export const getRoomAmenty = async()=>{
  const response = await API.get('/Room-Amenty')
  return response.data
}

export const getBathRoomTypes = async()=>{
  const response = await API.get('/BathRoom-types')
  return response.data
}
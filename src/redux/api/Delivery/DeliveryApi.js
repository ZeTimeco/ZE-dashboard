import API from "../../../../config/api";


/** Food delivery*********************************************************** */
//---------------------------------------------------------------------------
export const getOrders = async () => {
  const response = await API.get(`/provider/food-delivery/delivery-dashboard`);
  return response.data;
}

export const getDeliveryMap = async () => {
  const response = await API.get(`/provider/food-delivery/delivery-map`);
  return response.data;
}


/** Delivery*********************************************************** */
//---------------------------------------------------------------------------

export const getMyDeliveries = async (filter) => {
  const params = typeof filter === 'object' && filter !== null ? filter : (filter ? { filter } : {})
  const response = await API.get('/provider/parcel/Company/my-deliveries', { params })
  return response.data
}

export const getActiveDeliveryID = async(id)=>{
  const response = await API.get(`/provider/parcel/Company/bookings/${id}/activeDelivery`)
  return response.data
}




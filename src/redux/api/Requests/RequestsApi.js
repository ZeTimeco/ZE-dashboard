import API from "../../../../config/api"

//Home-Car-Street_module
//************************************************* */

export const getBookings = async({ page = 1, status, date_from, date_to, city, service_id } = {})=>{
  const params = new URLSearchParams()
  params.append('page', page)
  if (status) params.append('status', status)
  if (date_from) params.append('date_from', date_from)
  if (date_to) params.append('date_to', date_to)
  if (city) params.append('city', city)
  if (service_id) params.append('service_id', service_id)
  const response = await API.get(`/provider/bookings?${params.toString()}`)
  return response.data
}

export const getDrowpdownFilters = async()=>{
  const response = await API.get('/provider/getFilters')
  return response.data
}

export const getBookingByID =async(id)=>{
  const response = await API.get(`/provider/bookings/${id}`)
  return response.data
}

export const getAvailableHandymen = async(formData)=>{
  const response = await API.post('/available-handymen', formData)
  return response.data
}

export const assignHandyman = async(formData)=>{
  const response = await API.post('/assign-handymen', formData)
  return response.data
}

export const UpdateBooking = async(id, formData)=>{
  const response = await API.post(`/provider/bookings/${id}`, formData)
  return response.data
}

export const getRejectionReasons = async()=>{
  const response = await API.get('/rejection-reasons')
  return response.data
}


//property_module
//************************************************* */
export const getAllBookingProperty = async()=>{
  const response = await API.get('/properties/allbookings')
  return response.data
}

export const getBookingByIdProperty = async(id)=>{
  const response = await API.get(`/properties/bookings/${id}`)
  return response.data
}

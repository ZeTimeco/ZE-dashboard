import API from "../../../../config/api"

export const changeEmail = async({email})=>{
  const response = await API.post('/provider/changeEmailRequest' , {email})
  // console.log('API response:', response.data);
  return response.data
}

export const verifyEmailOtp = async({otp})=>{
  const response = await API.post('/provider/changeEmailOtp' , {otp})
  // console.log('Verify OTP response:', response.data);
  return response.data
}


// profile endpoint to update localstorage data of user******/////
export const getProfile = async()=>{
  const response = await API.get('/provider/me')
  return response.data
}

export const changePhone = async({phone , country_code})=>{
  const response = await API.post('/provider/changePhoneRequest' , {phone , country_code})
  return response.data
}

export const verifyPhoneOtp = async({otp})=>{
  const response = await API.post('/provider/changePhoneOtp' , {otp})
  // console.log('Verify OTP response:', response.data);
  return response.data
}

export const CardMarketer = async()=>{
  const response =  await API.get('/marketer/analysis')
  return response.data
}

export const withdrawsMarketer = async (params) => {
  const response = await API.get("/marketer/withdraws", { params });
  return response.data;
};


export const deleteWithdrawsMarketer = async(marketerId)=>{
  const response = await API.post('/marketer/cancel/Withdraw' , {id:marketerId})
  return response.data
}

export const AddIpn = async(formData)=>{
  const response = await API.post('/marketer/add-ipn' , formData , {
    headers: {
      'Content-Type': 'multipart/form-data',
    }})
    return response
}

export const setNewPassword = async(formData)=>{
  const response = await API.post('/provider/change-password',{ ...formData}, {
    headers: {
      'Content-Type': 'application/json',
    }})
  return response 
}

export const updateProfileImage = async (formData) => {
  const response = await API.post("/provider/update-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

/***************************************************** */
//******Activity_Settings************************************************************
/* Home-Car-Street_module */
export const getPolicies = async()=>{
  const response = await API.get('/provider/policies')
  return response.data
}

export const deletePolicy = async(policyId)=>{
  const response = await API.delete(`/provider/policies/${policyId}`)
  return response.data
}

export const createPolicies = async(formData)=>{
  const response = await API.post ('/provider/policies' , formData)
  return response.data
}

export const editPolicies = async(formData)=>{
  const response = await API.post('/provider/policies/edit' ,formData )
  return response.data
}


// get review
export const getReview = async()=>{
  const response = await API.get('/provider/reviews')
  return response.data
}

export const getWorkplaces = async()=>{
  const response = await API.get('/provider/getAllAreas')
  return response.data
}

export const deleteArea = async(areaId)=>{
  const response = await API.post('/provider/deleteArea' , {id: areaId})
  return response.data
}

export const addArea = async(formData)=>{
  const response = await API.post('/provider/addArea',formData)
  return response.data
}

export const getSchedule = async()=>{
  const response = await API.get('/provider/schedule')
  return response.data.data
}

export const updateSchedule =async(formData)=>{
  const response = await API.post('/provider/updateSchedule' ,formData)
  return response.data
}

export const getRequiredDocuments = async()=>{
  const response = await API.get('/provider/required-documents')
  return response.data
}
export const uploadDocument = async(formData)=>{
  const response = await API.post('/provider/documents' ,formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

//---------------------------------------------------------------------------------------
/* property_module */

export const getBookingSetting = async()=>{
  const response = await API.get('/provider/booking-settings')
  return response.data
}

export const BookingSetting = async(formData)=>{
  const response = await API.post('/provider/booking-settings', formData)
  return response.data
}


export const getCalendarSetting = async()=>{
  const response = await API.get('/provider/calendar-settings')
  return response.data
}

export const CalendarSetting = async(formData)=>{
  const response = await API.post('/provider/calendar-settings' , formData )
  return response.data
}

export const getRuleSetting = async()=>{
  const response = await API.get('/provider/rules-settings')
  return response.data
}

export const RuleSetting = async(formData)=>{
  const response = await API.post('/provider/rules-settings' , formData)
  return response.data
}

export const getAdvancedSetting = async()=>{
  const response = await API.get('/provider/advanced-settings')
  return response.data
}

export const AdvancedSetting = async(formData)=>{
  const response = await API.post('/provider/advanced-settings' , formData)
  return response.data
}



//---------------------------------------------------------------------------------------
/* Queue_Module */

export const getRestaurantTypes = async()=>{
  const response = await API.get('/provider/restaurant/types')
  return response.data
}

export const getRestaurantInformation = async()=>{
  const response = await API.get('/provider/restaurant/profile')
  return response.data
}

export const editRestaurantInformation = async(formData)=>{
  const response = await API.post('/provider/restaurant/profile', formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export const getBookingSettings = async()=>{
  const response = await API.get('/provider/restaurant/booking-settings')
  return response.data
}

export const editBookingSettings = async(formData)=>{
  const response = await API.post('/provider/restaurant/booking-settings', formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export const getWaitlistSettings = async()=>{
  const response = await API.get('/provider/restaurant/waitlist-settings')
  return response.data
}

export const editWaitlistSettings = async(formData)=>{
  const response = await API.post('/provider/restaurant/waitlist-settings', formData);
  return response.data;
}

export const getSeatingSettings = async()=>{
  const response = await API.get('/provider/restaurant/seating-settings')
  return response.data
}

export const editSeatingSettings = async(formData)=>{
  const response = await API.post('/provider/restaurant/seating-settings', formData);
  return response.data;
}

export const getRestaurantViews = async()=>{
  const response = await API.get('/provider/restaurant/Views')
  return response.data
}

export const getFloorplanSettings = async()=>{
  const response = await API.get('/provider/restaurant/floorplan-settings')
  return response.data
}

export const editFloorplanSettings = async(formData)=>{
  const response = await API.post('/provider/restaurant/floorplan-settings', formData);
  return response.data;
}

export const addTags = async(formData)=>{
  const response = await API.post('/provider/Tag', formData);
  return response.data;
}

export const deleteTags = async(id)=>{
  const response = await API.delete(`/provider/Tag/${id}`);
  return response.data;
}

export const getNotificationSettings = async()=>{
  const response = await API.get('/provider/restaurant/notification-settings')
  return response.data
}

export const editNotificationSettings = async(formData)=>{
  const response = await API.post('/provider/restaurant/notification-settings', formData);
  return response.data;
}

export const getPaymentSettings = async()=>{
  const response = await API.get('/provider/restaurant/payment-settings')
  return response.data
}

export const editPaymentSettings = async(formData)=>{
  const response = await API.post('/provider/restaurant/payment-settings', formData);
  return response.data;
}

export const getWorkingTimesSettings = async()=>{
  const response = await API.get('/provider/restaurant/working-times')
  return response.data
}

export const editWorkingTimesSettings = async(formData)=>{
  const response = await API.post('/provider/restaurant/working-times', formData);
  return response.data;
}
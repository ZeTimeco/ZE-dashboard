import React, { useEffect, useState } from 'react'
import BoxPage from './Box/page'
import TitlePage from './Title/page'
import Card from './Cards/Card'
import NoCards from './Cards/NoCards'
import { useDispatch, useSelector } from 'react-redux'
import { getParcelHomeThunk } from '@/redux/slice/Home/HomeSlice'
import Loader from '@/app/Components/Loader/Loader'
import Under_ReviewPage from './Dialog/Incoming_Delivery_Request/Under_Review/page'
import Details_RequestPage from './Dialog/Incoming_Delivery_Request/Details_Request/page'

function FreelancePage() {
    const [openIncomingRequestDialog, setOpenIncomingRequestDialog] = useState(false)

  //API
  const dispatch = useDispatch()
  const {getParcelHome , loading } = useSelector((state) => state.Home)
  


  const fetchParcelHome = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        dispatch(getParcelHomeThunk({ latitude, longitude }))
      },
      (error) => {console.log(error)}
    ) 
  }


  useEffect(() => {
    fetchParcelHome()

    const interval = setInterval(() => {
      fetchParcelHome()
    }, 5 * 60 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (loading) {
    return <Loader />
  }


  // console.log( 'getParcelHome' , getParcelHome);


  return (
    <>
      <TitlePage getParcelHome={getParcelHome} dispatch={dispatch}/>
      <BoxPage getParcelHome={getParcelHome}/>

    <div className='flex justify-end mt-10'>
      <button className='border cursor-pointer px-3' onClick={() => setOpenIncomingRequestDialog(true)}>
        IncomingRequest
      </button>
    </div>
      
      
      {getParcelHome?.new_requests?.length === 0 && getParcelHome?.active_delivery === null  
        ? (
            <NoCards/>
          ):(
            <Card getParcelHome={getParcelHome}/>
          ) 
      }
      
      <Details_RequestPage
        open={openIncomingRequestDialog}
        setOpen={setOpenIncomingRequestDialog}
      />
    </>
  )
}

export default FreelancePage
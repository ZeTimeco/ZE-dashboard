import React, { useEffect } from 'react'
import BoxPage from './Box/page'
import TitlePage from './Title/page'
import Card from './Cards/Card'
import NoCards from './Cards/NoCards'
import { useDispatch, useSelector } from 'react-redux'
import { getParcelHomeThunk } from '@/redux/slice/Home/HomeSlice'
import Loader from '@/app/Components/Loader/Loader'

function FreelancePage() {
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


  console.log( 'getParcelHome' , getParcelHome);

  return (
    <div>
      <TitlePage getParcelHome={getParcelHome}/>
      <BoxPage getParcelHome={getParcelHome}/>
      
      <Card getParcelHome={getParcelHome}/>
      {/* <NoCards/> */}
    </div>
  )
}

export default FreelancePage
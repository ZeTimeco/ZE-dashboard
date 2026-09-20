import React, { useEffect } from 'react'
import TitlePage from './Title/page'
import BoxPage from './Box/page'
import ActiveConnectionPage from './ActiveConnection/page'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanyDashboardThunk } from '@/redux/slice/Home/HomeSlice'

function CompanyPage() {
  const dispatch = useDispatch()
  const {getCompanyDashboard} = useSelector((state)=>state.Home)
  useEffect(()=>{
    dispatch(getCompanyDashboardThunk())
  },[dispatch])

  // console.log('getCompanyDashboard' , getCompanyDashboard);
  return (
    <div>
      <TitlePage getCompanyDashboard={getCompanyDashboard}/>
      
      <BoxPage getCompanyDashboard={getCompanyDashboard}/>

      <ActiveConnectionPage getCompanyDashboard={getCompanyDashboard}/>
    </div>
  )
}

export default CompanyPage
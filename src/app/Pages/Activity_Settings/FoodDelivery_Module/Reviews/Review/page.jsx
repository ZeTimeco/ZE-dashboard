import React, { useEffect } from 'react'
import Rate from './Rate'
import { useDispatch, useSelector } from 'react-redux'
import { getRatingConfigThunk } from '@/redux/slice/Setting/SettingSlice'
import Comment from './Comment'

function ReviewPage() {
  const dispatch = useDispatch()
  const {getRatingConfig} = useSelector((state)=>state.setting)

  useEffect(()=>{
    dispatch(getRatingConfigThunk())
  },[dispatch])
  

  // console.log('getRatingConfig' , getRatingConfig)
  




  return (
    <>
      <Rate getRatingConfig={getRatingConfig?.summary}/>
      <Comment getRatingConfig={getRatingConfig?.data}/>
    </>
  )
}

export default ReviewPage
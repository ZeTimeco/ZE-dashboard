import React, { useEffect } from 'react'
import Rate from './Rate'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import { getRatingConfigThunk } from '@/redux/slice/Setting/SettingSlice'

function ReviewPage() {
  const dispatch = useDispatch()
  const {getRatingConfig} = useSelector((state)=>state.setting)

  useEffect(()=>{
    dispatch(getRatingConfigThunk())
  },[dispatch])
  
  console.log('getRatingConfig' , getRatingConfig)
  





  return (
    <>
      <Rate getRatingConfig={getRatingConfig?.summary}/>
      <Comment getRatingConfig={getRatingConfig}/>
    </>
  )
}

export default ReviewPage
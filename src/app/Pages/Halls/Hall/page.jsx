"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import No_Halls_Add from './No_Halls_Add'
import { useTranslation } from 'react-i18next'
import AddBtn from '@/app/Components/Buttons/AddBtn'
import CardOfHall from './CardOfHall'
import { useDispatch, useSelector } from 'react-redux'
import { getHallsThunk } from '@/redux/slice/Halls/HallsSlice'


function HallPage() {
  const {t} = useTranslation()

  //api
  const dispatch = useDispatch();
  const {halls, loading, error} = useSelector((state) => state.halls);
  useEffect(()=>{
    dispatch(getHallsThunk());
  }, [dispatch])

  
  return (
    <MainLayout>
      <>

      {halls?.data?.label === 0 ? (
        <No_Halls_Add />
      ):(
        <div>
        {/* header */}
        <div className=" flex justify-between mb-8">
          <div>
            <p className='text-[#364152] text-2xl font-medium'>{t("Halls")}</p>
            <p className='text-[#697586] text-xl font-normal'>{t("It was equipped")}  {halls?.active_halls}  {t("hall")}</p>
          </div>
          <AddBtn               
            href="/Pages/Halls/Hall/Add"
            label="Adding a new hall" 
          />
        </div>

        {/* cards */}
        <div  className='border border-[#E3E8EF] py-8 px-6 rounded-[3px]'>
          <CardOfHall halls={halls}/>
        </div>
        


        </div>
      )}
      
      
      </>
    </MainLayout>
  )
}

export default HallPage
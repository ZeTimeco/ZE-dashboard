'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import React, { useEffect } from 'react'
import No_Tables_Add from './No_Tables_Add';
import CardOfTable from './CardOfTable';
import { useTranslation } from 'react-i18next';
import AddBtn from '@/app/Components/Buttons/AddBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { getTablesThunk } from '@/redux/slice/Halls/HallsSlice';

function TablesPage() {
  const {t} = useTranslation()
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const dispatch = useDispatch()
  const {getTables}=useSelector((state)=>state.halls)
  
  useEffect(()=>{
    if(id){
      dispatch(getTablesThunk(id))
    }
  },[dispatch,id])

  console.log('getTables///' , getTables);

  return (
    <MainLayout>
      
      {/* <No_Tables_Add/> */}
        <div>
          {/* header */}
          <div className=" flex justify-between mb-8">
            <div>
              <p className='text-[#364152] text-2xl font-medium'>{t("tables")}</p>
              <p className='text-[#697586] text-xl font-normal'>{t("Main Hall")} -  2  {t("tables")}</p>
            </div>
            <AddBtn               
              href="/Pages/Halls/Tables/Add"
              label="Add a new table" 
            />
          </div>
  
          {/* cards */}
          <div  className='border border-[#E3E8EF] py-8 px-6 rounded-[3px]'>
            <CardOfTable getTables={getTables}/>
          </div>
          
  
  
          </div>
    </MainLayout>
  )
}

export default TablesPage
"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import RoomPage from './Room/page';
import BathroomPage from './Bathroom/page';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/app/Components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addUnitsThunk, getUnitsThunk } from '@/redux/slice/Services/ServicesSlice';

function RoomsAndBathroomsPageContent() {
  const {t} = useTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const dispatch = useDispatch()
    const {getUnits } = useSelector((state) => state.services)
    const getUnitsData = getUnits?.data
    const [formData, setFormData] = useState({
      property_id:'',
      rooms: [],
      bathrooms: []
    })

    useEffect(()=>{
      if(id){
        setFormData((prev)=>({
          ...prev,
          property_id: id
        }))
      }
    }, [id])

    useEffect(()=>{
        if(id){
          dispatch(getUnitsThunk(id))
        }
    } , [id])

    useEffect(() => {
  if (getUnitsData) {
    setFormData((prev) => ({
      ...prev,

      rooms: getUnitsData.rooms?.map((room) => ({
        id: room.id || Date.now() + Math.random(),
        open1: false,
        selected1: room.room_type || "",
        searchValue1: "",
        images: room.images || [],
        previewImages: room.images || [],
        beds: room.beds || [],
        features: room.features || [],
      })) || [],

      bathrooms: getUnitsData.bathrooms?.map((bathroom) => ({
        id: bathroom.id || Date.now() + Math.random(),
        open1: false,
        selected1: bathroom.bathroom_type || "",
        searchValue1: "",
        open2: false,
        selected2: bathroom.location || "",
        searchValue2: "",
        images: bathroom.images || [],
        previewImages: bathroom.images || [],
        selectedFeature: bathroom.access_type || null,
      })) || [],
    }));
  }
}, [getUnitsData]);

  const handleSave = async () => {
    try {
      const result = await dispatch(addUnitsThunk(formData))

      if (result?.meta?.requestStatus === "fulfilled") {
        router.push(`/Pages/Services/Property_Module/Service/Edit?id=${formData.property_id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

    console.log(id);
    console.log(getUnits);
    console.log(getUnitsData);
  return (
    <MainLayout>
      <TitleOfHeader/>
      
      <div className='border border-[#E6E6E6] p-8 rounded-[3px] mb-4'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 3 :</span>
            <span>{t('Rooms and bathrooms')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>3 غرف نوم . 2 حمام . 4 أسرة</p>
          <div className='border border-[#CDD5DF] mt-4'></div>
        </div>


        <>
          <RoomPage 
            setFormData={setFormData} 
            formData={formData}
          />
          <BathroomPage setFormData={setFormData} formData={formData}/>

        </>



    {/* btn */}
        <div className="flex  mt-6">
          
          <div className='flex gap-2 justify-start w-full '>
            <button
              onClick={()=> router.push(`/Pages/Services/Property_Module/Service/Edit?id=${id}`)}
              className="h-15 w-[15%]  border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
            >
              {t('Return')}
            </button>

            <button
              onClick={handleSave}
              className="h-15 w-[15%] bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
            >
              {t('Save changes')}
            </button>
          </div>
          
        </div>
      </div>
    </MainLayout>
  )
}

export default function RoomsAndBathroomsPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <RoomsAndBathroomsPageContent />
    </Suspense>
  )
}
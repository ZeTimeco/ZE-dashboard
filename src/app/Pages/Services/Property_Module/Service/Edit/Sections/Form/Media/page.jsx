"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import Loader from '@/app/Components/Loader/Loader';
import FirstNote from './FirstNote';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';
import { addMediaThunk, getMediaThunk } from '@/redux/slice/Services/ServicesSlice';
import { useDispatch, useSelector } from 'react-redux';

function MediaPageContent() {
  const {t} = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const dispatch = useDispatch();
  const { getMedia } = useSelector((state) => state.services);
  const getMediaData = getMedia?.data;

  // formData.images: mix of strings (server paths) and File objects (new uploads)
  const [formData, setFormData] = useState({
    images: [],
    video: '',
    vr_path: '',
  });

  // Fetch media on mount
  useEffect(() => {
    if (id) dispatch(getMediaThunk(id));
  }, [id]);

  // Populate formData from server response
  useEffect(() => {
    if (getMediaData) {
      setFormData({
        images: getMediaData?.images || [],
        video: getMediaData?.video || '',
        vr_path: getMediaData?.vr_path || '',
      });
    }
  }, [getMediaData]);

  // Save: build FormData and POST
  const handleSave = async () => {
    const data = new FormData();
    data.append('property_id', id);

    // Images — only send new File uploads, server paths are already saved
    formData.images.forEach((img, i) => {
      if (img instanceof File) {
        data.append(`images[${i}][file]`, img, img.name);
      }
    });

    // Videos
    if (formData.video) {
      data.append('video', formData.video);
    }

    // VR path
    if (formData.vr_path) {
      data.append('vr_path', formData.vr_path);
    }

    // Debug
    console.log('=== FormData entries ===');
    for (const [key, val] of data.entries()) {
      console.log(key, val instanceof File ? `[File: ${val.name}]` : val);
    }

    const result = await dispatch(addMediaThunk(data));
    if (result?.meta?.requestStatus === 'fulfilled') {
      router.push(`/Pages/Services/Property_Module/Service/Edit?id=${id}`);
    }
  };

  return (
    <MainLayout>
      <TitleOfHeader/>
      <div className='border border-[#E6E6E6] p-8 rounded-[3px] mb-4'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 8 :</span>
            <span>{t('Media')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>تم تحميل {formData.images.length} صور</p>
          <div className='border border-[#CDD5DF] my-4'></div>
        </div>
        
        <FirstNote/>
        <UploadImage formData={formData} setFormData={setFormData}/>
        <UploadVideo formData={formData} setFormData={setFormData}/>

        {/* btn */}
        <div className="flex mt-6">
          <div className='flex gap-2 justify-start w-full'>
            <button
              onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit?id=${id}`)}
              className="h-15 w-[15%] border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
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

export default function MediaPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <MediaPageContent />
    </Suspense>
  )
}
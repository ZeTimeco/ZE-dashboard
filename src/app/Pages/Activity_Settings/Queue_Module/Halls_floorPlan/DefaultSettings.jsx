'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddDialog from './AddDialog'
import { useDispatch } from 'react-redux'
import i18n from '@/language/i18n'
import { addTagsThunk, deleteTagsThunk, getFloorplanSettingsThunk } from '@/redux/slice/Setting/SettingSlice'

function DefaultSettings({getFloorplanSettings , formData , setFormData}) {
  const {t} = useTranslation() 

  const [openAdd , setOpenAdd]= useState(false)

  const currentLang = i18n.language.startsWith("ar") ? "ar" : "en";

  //api
  const dispatch = useDispatch()
  const [dataSend , setDataSend] = useState({
    name:{
      ar:'',
      en:''
    }
  })
  const handleAddTag = async () => {
    const currentLang = i18n.language.startsWith("ar") ? "ar" : "en";

    const payload = {
      name: {
        [currentLang]: dataSend.name[currentLang],
      },
    };

    try {
      await dispatch(addTagsThunk(payload)).unwrap();
      dispatch(getFloorplanSettingsThunk())
      setOpenAdd(false)

    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTag = async (id) => {
    try {
      await dispatch(deleteTagsThunk(id)).unwrap();
      await dispatch(getFloorplanSettingsThunk());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>

        <div className='flex justify-between'>
          <p className='text-[#364152] text-base font-medium'>{t('Default Settings')}</p>
          <button onClick={()=>setOpenAdd(true)} className='w-8 h-8 bg-[var(--color-primary)] flex justify-center items-center rounded-[3px] cursor-pointer'>
            <img src="/images/icons/AddIcon.svg" alt="" />
          </button>
        </div>

        <div>
          <p className='text-[#364152] text-sm font-normal'>{t('Virtual table tags')}</p>

          <div className='flex flex-wrap gap-3 mt-3'>
            {getFloorplanSettings?.tags?.map((tag)=>(
              <div key={tag?.id} className='border border-[var(--color-primary)] bg-[#F4EAD0] flex gap-2 rounded-full px-3 h-7.5'>
                <p className='text-[var(--color-primary)] text-sm font-normal flex items-center' >
                  <span>{tag?.name}  </span>
                </p>
                <button onClick={()=>handleDeleteTag(tag?.id)} className='cursor-pointer'>
                  <img src="/images/icons/x_yellow.svg" className="w-5 h-5" />
                </button>
              </div>
            ))}
            
          </div>


        </div>
      </div>



    <AddDialog
      open={openAdd}
      setOpen={setOpenAdd}
      handleAddTag={handleAddTag}
      dataSend={dataSend}
      setDataSend={setDataSend}
      currentLang={currentLang}
    />
    </>
  )
}

export default DefaultSettings
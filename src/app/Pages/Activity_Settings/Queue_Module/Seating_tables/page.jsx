'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import SeatingOptions from './SeatingOptions'
import AutomaticControl from './AutomaticControl'
import QR_Login from './QR_Login'
import TableControl from './TableControl'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { editSeatingSettingsThunk, getSeatingSettingsThunk } from '@/redux/slice/Setting/SettingSlice'

function Seating_tablesPage() {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const {getSeatingSettings} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getSeatingSettingsThunk())
  },[dispatch])

  console.log('getSeatingSettings' , getSeatingSettings);

  const [formData , setFormData] = useState({
    seating_mode:'',
    auto_suggest_table:1,
    late_grace_minutes:'',
    qr_checkin_enabled:1,
    qr_manual_code_enabled:1,
    staff_table_control_mobile:1,
  })

  useEffect(() => {
    if (getSeatingSettings) {
      setFormData({
        seating_mode: getSeatingSettings.seating_mode ?? "",
        auto_suggest_table: getSeatingSettings.auto_suggest_table ?? true,
        late_grace_minutes: getSeatingSettings.late_grace_minutes ?? "",
        qr_checkin_enabled: getSeatingSettings.qr_checkin_enabled ?? true,
        qr_manual_code_enabled: getSeatingSettings.qr_manual_code_enabled ?? true,
        staff_table_control_mobile:
          getSeatingSettings.staff_table_control_mobile ?? true,
      });
    }
  }, [getSeatingSettings]);

  const handleSubmit = async ()=>{
    try{
      await dispatch(editSeatingSettingsThunk(formData)).unwrap()
      await dispatch(getSeatingSettings())
    }catch(error){
      console.log(error);
    }
  }


  return (
    <>

      <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <SeatingOptions formData={formData} setFormData={setFormData} />
            <AutomaticControl formData={formData} setFormData={setFormData}/>
            <QR_Login formData={formData} setFormData={setFormData}/>
            <TableControl formData={formData} setFormData={setFormData}/>
        
            <button onClick={handleSubmit} className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
            {t('Save changes')}
          </button>
          </div>
    
          
          
      </div>

    </>
  )
}

export default Seating_tablesPage
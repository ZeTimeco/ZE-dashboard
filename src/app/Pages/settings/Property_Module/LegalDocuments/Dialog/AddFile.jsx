'use client'
import { Dialog } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocumentThunk, getRequiredDocumentsThunk } from '@/redux/slice/Setting/SettingSlice';

function AddFile({open , setOpen, docKey}) {
  const {t} = useTranslation()
  const [expiryDate, setExpiryDate] = useState(null);
  //////
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }
  //api
  const dispatch = useDispatch()
  const {document , loading ,error} = useSelector((state)=>state.setting)

  const handleUpload = async ()=>{
    if (!selectedFile || !expiryDate) return;

  const formData = new FormData();

  formData.append("doc_key", docKey);
  formData.append("file", selectedFile);
  formData.append("expiry_date", expiryDate.format("YYYY-MM-DD"));

  await dispatch(uploadDocumentThunk(formData)).unwrap();
  dispatch(getRequiredDocumentsThunk());

  setOpen(false);
  }
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "AddFuel-dialog" }}
    >
      <section className="px-6 mt-6">
        <button
          onClick={()=>setOpen(false)}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </section>

      <section className="mt-1 px-6 flex flex-col items-center gap-2 mb-8">
        <p className="text-[var(--color-primary)] text-2xl font-medium ">{t("Add a new document")}</p>
        <p className="text-[#4B5565] text-base font-normal ">
          {t("Please upload the required document and specify its expiry date.")}
        </p>
      </section>

      {/* file */}
      <section className='p-6'>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
        />

        {!selectedFile ? (
          <div className='p-3 flex flex-col items-center gap-3 border-2 border-dashed border-[#CDD5DF] rounded-[3px]'>
            <img src="/images/uploadd.svg" alt="" />
            <p className='text-[#1F055C] text-base font-normal'>{t('Click to upload the file')}</p>
            <button 
              onClick={handleButtonClick}
              className='w-[30%] h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] px-4 cursor-pointer'>
              {t('Upload file')}
            </button>
          </div>
        ) : (
          <div className='p-3 border border-[#CDD5DF] rounded-[3px] flex items-center justify-between bg-white'>
            <div className='flex items-center gap-3'>
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <img src="/images/filephoto.svg" className="w-12 h-12" />
                  <span className="absolute bottom-0 right-2  text-white text-[10px] px-1 py-0.5 rounded-sm">
                    pdf
                  </span>
                </div>

              <div className='flex flex-col'>
                <p className='text-[#344054] text-sm font-medium'>{selectedFile.name}</p>
                <p className='text-[#475467] text-sm font-normal'>
                  200 كيلوبايت - 100% تم الرفع
                </p>
              </div>
            </div>
            
            <div className='flex items-center'>
              <button onClick={() => setSelectedFile(null)} className='cursor-pointer'>
                <img src="/images/icons/checkmark-circle-false_bgRed.svg" alt="remove" className='w-6 h-6' />
              </button>
            </div>
          </div>
        )}     
      </section>
      
      <section className='px-4'>
        <p className='text-[#364152] text-sm font-medium mb-2'>{t('Specify the expiry date')}</p>
      <div className="relative w-full mb-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="DD/MM/YYYY"
            fieldDirection="rtl"
            value={expiryDate}
            onChange={(newValue) => setExpiryDate(newValue)}
            slotProps={{
              textField: {
                placeholder: "00/00/0000",
                fullWidth: true,
                sx: {
                  '& .MuiInputBase-input': {
                    paddingLeft: '12px', 
                    textAlign: 'right', 
                    fieldDirection: 'rtl',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '3px',
                  }
                }
              },
            }}
          />
        </LocalizationProvider>
      </div>

      </section>

      <section className='w-full flex gap-3 px-6 py-4'>
        <button   onClick={handleUpload}
        className={`${selectedFile && expiryDate ? 'bg-[var(--color-primary)] text-white' : 'bg-[#E3E8EF] text-[#9AA4B2]'} w-full h-14 rounded-[3px] cursor-pointer`}>{t('save')}</button>
        <button
          onClick={()=>setOpen(false)}
          className='border border-[var(--color-primary)] text-[var(--color-primary)] w-full h-14 rounded-[3px] cursor-pointer '>{t('cancel')}</button>
      </section>

  </Dialog>
        
  )
}

export default AddFile
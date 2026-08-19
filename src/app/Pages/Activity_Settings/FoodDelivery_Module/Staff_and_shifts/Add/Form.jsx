import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddRole from './Dialog/AddRole'

function Form({formData , setFormData}) {
  const {t} = useTranslation()

  const [openRole , setOpenRole] = useState(false)
  const [selectedRole , setSelectedRole] = useState(null)

  const handleSelectRole = (role) => {
    setSelectedRole(role)
    setFormData((prev) => ({ ...prev, role_id: role?.id ?? null }))
  }
  
  return (
    <>
      {/* Basic Information */}
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='text-[#364152] text-base font-medium mb-6'>{t('Basic Information')}</p>
        <div className='flex flex-col gap-3'>

          {/* Full name  */}
          <div className='w-full flex flex-col gap-1'>
            <p className='text-sm font-medium mb-1.5'>
              <span className='text-[#364152] font-medium text-sm  mb-1.5'>{t('Full name')}  </span>
              <span className=' text-[#F04438]'>*</span>
            </p>  
            <input 
              type="text"
              name='title'
              value={formData?.name}
              onChange={(e)=>{
                setFormData({...formData, name:e.target.value})
              }}
              placeholder={t("Full name")}
              className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
            />
          </div>

          {/* phone number  */}
          <div className='w-full flex flex-col gap-1'>
            <p className='text-sm font-medium mb-1.5'>
              <span className='text-[#364152] font-medium text-sm  mb-1.5'>{t('phone number')}  </span>
              <span className=' text-[#F04438]'>*</span>
            </p>  
            <input 
              type="text"
              name='title'
              value={formData?.phone}
              onChange={(e)=>{
                setFormData({...formData , phone:e.target.value})
              }}
              placeholder={t("phone number")}
              className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
            />
          </div>

          {/* Email  */}
          <div className='w-full flex flex-col gap-1'>
            <p className='text-sm font-medium mb-1.5'>
              <span className='text-[#364152] font-medium text-sm  mb-1.5'>{t('Email')}  </span>
            </p>  
            <input 
              type="text"
              name='title'
              value={formData?.email}
              onChange={(e)=>{
                setFormData({...formData , email:e.target.value})
              }}
              placeholder={t("Email")}
              className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
            />
          </div>


        </div>


      </div>


      {/* Choosing the role */}
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 mt-6'>
        <p className='text-[#364152] text-base font-medium mb-6'>{t('Choosing the role')}</p>

        {selectedRole ? (
          <div className='border border-[#E3E8EF] rounded-3px p-3 flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <p className='w-8 h-8 bg-[#EEF2F6] rounded-full flex justify-center items-center'>
                <img src="/images/icons/labor-gray.svg" alt="" className="w-4 h-4" />
              </p>
              <p className='text-[#364152] text-sm font-medium'>{selectedRole?.name}</p>
            </div>
            <button
              onClick={() => handleSelectRole(null)}
              className='text-[#F04438] text-xs cursor-pointer'
            >
              ✕
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-2 justify-center items-center'>
            <p className='bg-[#EEF2F6] w-12.5 h-12.5 rounded-full flex justify-center items-center'>
              <img src="/images/icons/labor-gray.svg" alt="" />
            </p>
            <p className='text-[#697586] text-base font-normal'>{t('The employee role was not selected.')}</p>
          </div>
        )}

        <div className='flex justify-center mt-3'>
          <button 
            onClick={()=>setOpenRole(true)}
            className={`flex gap-2 justify-center items-center bg-primary w-fit h-10 rounded-3px px-5 cursor-pointer`}
          >
            <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" />
            <span className="text-white text-base font-medium">{t('Choosing the role')}</span>
          </button>
        </div>

      </div>

      
      <AddRole
        open={openRole}
        setOpen={setOpenRole}
        selectedRole={selectedRole}
        setSelectedRole={handleSelectRole}
      />
      
    </>
  )
}

export default Form
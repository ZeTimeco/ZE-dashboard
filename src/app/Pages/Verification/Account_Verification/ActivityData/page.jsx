'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Upload_CommercialRegister from './Upload_CommercialRegister'
import Form from './Form'

function ActivityDataPage({
  commercialRegisterFile,
  onCommercialRegisterFileChange,
  commercialRegisterDeadline,
  onCommercialRegisterDeadlineChange,
  formData,
  onFormDataChange,
}) {
  const { t } = useTranslation()
  return (
    < div className='flex flex-col gap-6'>
    {/*  */}
    <header className="mb-6">
      <h2 className="text-xl font-medium text-[#171717]">{t('Enter activity data')}</h2>
      <p className="text-base text-[#737373] font-medium">{t('Please upload the required documents and enter the data correctly to review your account and activate the service')}</p>
    </header>
  
    {/* commercial register */}
    <Upload_CommercialRegister
      file={commercialRegisterFile}
      onFileChange={onCommercialRegisterFileChange}
      deadlineDate={commercialRegisterDeadline}
      onDeadlineChange={onCommercialRegisterDeadlineChange}
    />

    {/* form */}
    <Form formData={formData} onFormDataChange={onFormDataChange} />
      
    </div>
  )
}

export default ActivityDataPage
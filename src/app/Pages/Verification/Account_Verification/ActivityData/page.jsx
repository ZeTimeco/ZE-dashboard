'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Upload_CommercialRegister from './Upload_CommercialRegister'
import Form from './Form'
import Upload_NationalID from './Upload_NationalID'

function ActivityDataPage({
  commercialRegisterFile,
  onCommercialRegisterFileChange,
  commercialRegisterDeadline,
  onCommercialRegisterDeadlineChange,
  nationalIdFrontFile,
  onNationalIdFrontFileChange,
  nationalIdFrontDeadline,
  onNationalIdFrontDeadlineChange,
  nationalIdBackFile,
  onNationalIdBackFileChange,
  nationalIdBackDeadline,
  onNationalIdBackDeadlineChange,
  formData,
  onFormDataChange,
  showErrors,
}) {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col gap-6'>
    {/*  */}
    <header className="mb-6">
      <h2 className="text-xl font-medium text-[#171717]">{t('Enter activity data')}</h2>
      <p className="text-base text-[#737373] font-medium">{t('Please upload the required documents and enter the data correctly to review your account and activate the service')}</p>
    </header>
    
    <div className='flex flex-col gap-6 border border-[#E2E8F0] rounded-3px p-4'>
      <p className='border-b border-[#E2E8F0] pb-2 text-[#1F2937] text-base font-semibold'>{t('National ID/Residence Permit Copy')}</p>
      {/* national id */}
      <Upload_NationalID
        frontFile={nationalIdFrontFile}
        onFrontFileChange={onNationalIdFrontFileChange}
        frontDeadlineDate={nationalIdFrontDeadline}
        onFrontDeadlineChange={onNationalIdFrontDeadlineChange}
        backFile={nationalIdBackFile}
        onBackFileChange={onNationalIdBackFileChange}
        backDeadlineDate={nationalIdBackDeadline}
        onBackDeadlineChange={onNationalIdBackDeadlineChange}
        identityNumber={formData?.identityNumber}
        onIdentityNumberChange={(val) => onFormDataChange?.('identityNumber', val)}
        showErrors={showErrors}
      />
    </div>
  
    
    {/* commercial register */}
    <Upload_CommercialRegister
      file={commercialRegisterFile}
      onFileChange={onCommercialRegisterFileChange}
      deadlineDate={commercialRegisterDeadline}
      onDeadlineChange={onCommercialRegisterDeadlineChange}
      formData={formData}
      onFormDataChange={onFormDataChange}
      showErrors={showErrors}
    />

    {/* form */}
    <Form formData={formData} onFormDataChange={onFormDataChange} showErrors={showErrors} />
      
    </div>
  )
}

export default ActivityDataPage

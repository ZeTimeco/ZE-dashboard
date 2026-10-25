'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Data from './Data'
import Documents from './Documents'

function ReviewAndSendPage({
  onGoToFirstStage,
  formData,
  commercialRegisterFile,
  commercialRegisterDeadline,
  nationalIdFrontFile,
  nationalIdFrontDeadline,
  nationalIdBackFile,
  nationalIdBackDeadline,
  documentFiles,
  documentDeadlines,
  getBusinessModuleRequirements,
  isAcknowledged,
  onAcknowledgeChange,
}) {
  const { t } = useTranslation()

  const inputClassName ="w-4 h-4 appearance-none border border-gray-300 rounded-md bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";
  return (
    <>
    <div className='flex flex-col gap-4'>

    
      {/*  */}
      <header className="mb-2">
        <h2 className="text-xl font-medium text-[#171717]">{t('Data review and submission')}</h2>
        <p className="text-base text-[#737373] font-medium">{t('Please review all entered data before submitting the application for review and final approval.')}</p>
      </header>

      {/* Data */}
      <Data onGoToFirstStage={onGoToFirstStage} formData={formData} />

      {/* Documents */}
      <Documents
        commercialRegisterFile={commercialRegisterFile}
        commercialRegisterDeadline={commercialRegisterDeadline}
        nationalIdFrontFile={nationalIdFrontFile}
        nationalIdFrontDeadline={nationalIdFrontDeadline}
        nationalIdBackFile={nationalIdBackFile}
        nationalIdBackDeadline={nationalIdBackDeadline}
        documentFiles={documentFiles}
        documentDeadlines={documentDeadlines}
        getBusinessModuleRequirements={getBusinessModuleRequirements}
      />


      {/* check */}
      <label className='border border-[#E7E5E4] bg-[#FAFAF9CC] flex items-center gap-2 py-3 px-3 rounded-3px cursor-pointer'>
        <input
          type="checkbox"
          checked={isAcknowledged ?? true}
          onChange={(e) => onAcknowledgeChange?.(e.target.checked)}
          className={inputClassName}
        />
        <span className='text-[#44403C] text-xs font-medium select-none'>
          {t('I acknowledge the accuracy of all data and documents entered and I bear full legal responsibility for this.')}
        </span>
      </label>

      {/* note */}
      <div className="border border-primary text-primary bg-[#FFFBEBB2] text-sm font-medium flex flex-col gap-2 py-3 px-2 rounded-3px">
        <p className=" flex items-start gap-2">
          <span>-</span>
          {t('The application is reviewed and approved by the relevant authority.')}
        </p>

        <p className=" flex items-start gap-2">
          <span>-</span>
          {t('Your order will be processed after payment is completed.')}
        </p>
      </div>

    </div>
    </>
  )
}

export default ReviewAndSendPage
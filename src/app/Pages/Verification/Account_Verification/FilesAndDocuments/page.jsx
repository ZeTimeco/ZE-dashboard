'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Upload_Document from './Upload_Document'

function FilesAndDocumentsPage({
  getBusinessModuleRequirements,
  documentFiles,
  documentDeadlines,
  onDocumentFileChange,
  onDocumentDeadlineChange,
  showErrors,
}) {
  const { t } = useTranslation()
  console.log('getBusinessModuleRequirements?.requirements' ,getBusinessModuleRequirements?.requirements );
  return (
    <div className='flex flex-col gap-6'>
      {/*  */}
      <header className="mb-6">
        <h2 className="text-xl font-medium text-[#171717]">{t('Files and documents')}</h2>
        <p className="text-base text-[#737373] font-medium">{t("Please attach the required official documents and paperwork to verify the establishment's identity and activate your account.")}</p>
      </header>

      {getBusinessModuleRequirements?.requirements?.map((requirement , index)=>(
        <Upload_Document
          requirement={requirement}
          key={requirement?.field_key || index}
          title={requirement?.field_key}
          showDatePicker={requirement?.has_expiry_date}
          file={documentFiles?.[requirement?.field_key] || undefined}
          onFileChange={(file) => onDocumentFileChange?.(requirement?.field_key, file)}
          deadlineDate={documentDeadlines?.[requirement?.field_key] || undefined}
          onDeadlineChange={(date) => onDocumentDeadlineChange?.(requirement?.field_key, date)}
          showErrors={showErrors}
        />
      ))}
      
    

    </div>
  )
}

export default FilesAndDocumentsPage
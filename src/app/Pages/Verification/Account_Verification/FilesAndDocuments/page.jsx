'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Upload_Document from './Upload_Document'

function FilesAndDocumentsPage() {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col gap-6'>
      {/*  */}
      <header className="mb-6">
        <h2 className="text-xl font-medium text-[#171717]">{t('Files and documents')}</h2>
        <p className="text-base text-[#737373] font-medium">{t("Please attach the required official documents and paperwork to verify the establishment's identity and activate your account.")}</p>
      </header>

      {/* National ID - Front */}
      <Upload_Document title='National ID (Front)' showDatePicker={true} />

      {/* National ID - Back */}
      <Upload_Document title='National ID (Back)' showDatePicker={true} />

      {/* Bank Certificate (IBAN) */}
      <Upload_Document title='Bank Certificate (IBAN)' showDatePicker={false} />
    </div>
  )
}

export default FilesAndDocumentsPage
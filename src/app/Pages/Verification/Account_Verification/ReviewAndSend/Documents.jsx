'use client'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

function Documents({
  commercialRegisterFile,
  commercialRegisterDeadline,
  nationalIdFrontFile,
  nationalIdFrontDeadline,
  nationalIdBackFile,
  nationalIdBackDeadline,
  documentFiles,
  documentDeadlines,
  getBusinessModuleRequirements,
}) {
  const { t } = useTranslation()

  const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return ''
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const formatDate = (dateValue) => {
    if (!dateValue) return null
    // dayjs object
    if (dateValue?.format) return dateValue.format('DD/MM/YYYY')
    // Date object
    if (dateValue instanceof Date) {
      const d = dateValue.getDate().toString().padStart(2, '0')
      const m = (dateValue.getMonth() + 1).toString().padStart(2, '0')
      const y = dateValue.getFullYear()
      return `${d}/${m}/${y}`
    }
    return String(dateValue)
  }

  // Build documents list from real data
  const documents = useMemo(() => {
    const docs = []

    // National ID Front
    if (nationalIdFrontFile) {
      docs.push({
        label: t('Front national ID card photo'),
        fileName: nationalIdFrontFile.name,
        fileSize: formatFileSize(nationalIdFrontFile.size),
        expiryDate: formatDate(nationalIdFrontDeadline),
      })
    }

    // National ID Back
    if (nationalIdBackFile) {
      docs.push({
        label: t('Back national ID card photo'),
        fileName: nationalIdBackFile.name,
        fileSize: formatFileSize(nationalIdBackFile.size),
        expiryDate: formatDate(nationalIdBackDeadline),
      })
    }

    // Commercial register
    if (commercialRegisterFile) {
      docs.push({
        label: t('commercial register'),
        fileName: commercialRegisterFile.name,
        fileSize: formatFileSize(commercialRegisterFile.size),
        expiryDate: formatDate(commercialRegisterDeadline),
      })
    }

    // Dynamic documents from requirements
    const requirements = getBusinessModuleRequirements?.requirements || []
    for (const req of requirements) {
      const file = documentFiles?.[req.field_key]
      if (file) {
        docs.push({
          label: req.label || req.field_key,
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          expiryDate: formatDate(documentDeadlines?.[req.field_key]),
        })
      }
    }

    return docs
  }, [
    nationalIdFrontFile,
    nationalIdFrontDeadline,
    nationalIdBackFile,
    nationalIdBackDeadline,
    commercialRegisterFile,
    commercialRegisterDeadline,
    documentFiles,
    documentDeadlines,
    getBusinessModuleRequirements,
    t,
  ])

  return (
    <div className='border border-[#E7E5E4E5] rounded-3px p-3'>
      <div className='flex justify-between mb-3 border-b border-[#E7E5E4E5] pb-2'>
        <p className='flex items-center gap-2 '>
          <span className='inline-block w-2 h-2 rounded-full bg-primary'></span>
          <span className='text-[#1C1917] text-base font-semibold'>{t('Attached documents')}</span>
        </p>
      </div>

      <div className='flex flex-col gap-3'>
        {documents.length === 0 ? (
          <p className='text-[#A8A29E] text-sm font-medium py-2'>{t('No documents uploaded yet')}</p>
        ) : (
          documents.map((doc, index) => (
            <div key={index} className='flex items-center justify-between py-2'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-lg bg-[#FDF7E8] flex items-center justify-center shrink-0 border border-[#F3E8C4]'>
                  <img src="/images/icons/document-attachment-yellow.svg" alt="file" className="w-5 h-5" />
                </div>
                <div className='flex flex-col gap-0.5'>
                  <p className='text-[#292524] text-sm font-medium'>{t(doc.label)}</p>
                  <div className='flex items-center gap-2 text-xs text-[#A8A29E]'>
                    <span>{doc.fileName}</span>
                    <span>•</span>
                    <span>{doc.fileSize}</span>
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                {doc.expiryDate && (
                  <div className='flex items-center gap-1.5 text-xs'>
                    <img src="/images/icons/calendar_yellow.svg" alt="calendar" className="w-3.5 h-3.5" />
                    <span className='text-[#A8A29E] font-medium'>{t('Expiry date')}:</span>
                    <span className='text-primary font-semibold'>{doc.expiryDate}</span>
                  </div>
                )}

                <div className='w-6 h-6 rounded-full bg-[#ECFDF3] flex items-center justify-center'>
                  <svg className='w-3.5 h-3.5 text-[#12B76A]' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                  </svg>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Documents
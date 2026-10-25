'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

function Upload_Document({
  title,
  file: propFile,
  onFileChange,
  deadlineDate: propDeadline,
  onDeadlineChange,
  showDatePicker,
  requirement,
  showErrors,
}) {
  const { t } = useTranslation()
  const fileInputRef = useRef(null)
  const [internalFile, setInternalFile] = useState(null)
  const [internalDeadline, setInternalDeadline] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [fileError, setFileError] = useState(null)

  // Build dynamic accept string from requirement mimes (e.g. ["pdf","jpg"] → ".pdf,.jpg")
  const allowedMimes = requirement?.validation?.mimes
  const acceptString = allowedMimes?.length
    ? allowedMimes.map((ext) => `.${ext.toLowerCase()}`).join(',')
    : '.pdf,.jpg,.jpeg,.png'

  const validateFile = (file) => {
    if (!file) return false

    // Validate file extension against allowed mimes
    if (allowedMimes?.length) {
      const fileExt = file.name?.split('.').pop()?.toLowerCase()
      if (!fileExt || !allowedMimes.map((m) => m.toLowerCase()).includes(fileExt)) {
        setFileError(
          t('Unsupported file type. Allowed types:') + ' ' + allowedMimes.join(', ')
        )
        return false
      }
    }

    // Validate file size against max_size_kb
    const maxSizeKb = requirement?.validation?.max_size_kb
    if (maxSizeKb && file.size > maxSizeKb * 1024) {
      setFileError(
        t('File size exceeds the maximum allowed size of') + ' ' + maxSizeKb + ' KB'
      )
      return false
    }

    setFileError(null)
    return true
  }

  const selectedFile = propFile !== undefined ? propFile : internalFile
  const deadline = propDeadline !== undefined ? propDeadline : internalDeadline

  const updateFile = (file) => {
    if (propFile === undefined) {
      setInternalFile(file)
    }
    if (onFileChange) {
      onFileChange(file)
    }
  }

  const updateDeadline = (newDate) => {
    if (propDeadline === undefined) {
      setInternalDeadline(newDate)
    }
    if (onDeadlineChange) {
      onDeadlineChange(newDate)
    }
  }

  useEffect(() => {
    if (selectedFile && selectedFile.type?.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [selectedFile])

  const handleBoxClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!validateFile(file)) {
        // Reset the input so the same file can be re-selected after fixing
        if (fileInputRef.current) fileInputRef.current.value = ''
        return
      }
      updateFile(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (!validateFile(file)) return
      updateFile(file)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    updateFile(null)
    setFileError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return ''
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const fileExtension = selectedFile?.name?.split('.').pop()?.toUpperCase() || 'FILE'
  const isFileRequired = Boolean(requirement?.is_required)
  const isFileMissing = isFileRequired && !selectedFile
  const isFileError = Boolean((showErrors && isFileMissing) || fileError)
  const isDeadlineMissing = isFileRequired && showDatePicker && !deadline
  const isDeadlineError = Boolean(showErrors && isDeadlineMissing)

  return (
    <>
      <div className='w-full border border-[#EEEEEE] p-4'>
        <p className='text-sm font-medium mb-1.5 flex gap-2'>
          <span className='text-[#364152]'>{requirement?.field_key}</span>
          {requirement?.is_required ? (
            <span className='text-[#F04438]'>*</span>
          ) : (
            <span className='bg-[#F5F5F5] text-[#A3A3A3] font-medium text-2.5 w-fit px-3 py-1 rounded-full'>{t('optional')}</span>
          )}
        </p>

        {/* Hidden file input */}
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptString}
          className='hidden'
        />

        {/* Validation error message */}
        {fileError && (
          <p className='text-[#F04438] text-xs font-medium mb-2 flex items-center gap-1.5'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {fileError}
          </p>
        )}

        <div className='flex flex-col gap-6'>
          {/* Upload Box */}
          {!selectedFile ? (
            <div
              onClick={handleBoxClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border border-dashed ${
                isDragging
                  ? 'border-primary'
                  : 'border-[#CBD5E1]'
              } flex justify-between py-4 px-6 rounded-3px cursor-pointer hover:border-primary/60 transition-colors`}
            >
              <div className='flex flex-col gap-1'>
                <p className='text-[#1F2937] text-sm font-normal'>{requirement?.label}</p>
                <p className='text-[#9CA3AF] text-xs font-normal'>{t('Or drag the file here')}</p>
                <p className='bg-[#F0F2F5] p-3 w-fit rounded-3px text-[#6B7280] text-xs font-medium flex items-center gap-2'>
                  <span>{t('maximum')} {requirement?.validation?.max_size_kb ? Math.round(requirement.validation.max_size_kb / 1024) : 5} {t('megabytes')}</span>
                  <span className='w-[1px] h-3 bg-[#CBD5E1] inline-block'></span>
                  <span className="flex gap-2">
                    {requirement?.validation?.mimes?.map(m => m.toUpperCase()).join(", ") || 'PDF, JPG'}
                  </span>
                </p>
              </div>
              <div className='flex items-center'>
                <p>
                  <img src="/images/icons/upload_yellow.svg" alt="" />
                </p>
              </div>
            </div>
          ) : (
            <div className='border border-primary bg-white  flex items-center justify-between py-4 px-6 rounded-3px transition-colors'>
              <div className='flex items-center gap-3.5 overflow-hidden'>
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt='preview'
                    className='w-12 h-12 object-cover rounded-lg border border-primary/20 shrink-0'
                  />
                ) : (
                  <div className='w-12 h-12 rounded-lg bg-[#FDF7E8] flex items-center justify-center shrink-0 border border-[#F3E8C4]'>
                    <img src="/images/icons/document-attachment-yellow.svg" alt="file" className="w-6 h-6" />
                  </div>
                )}

                <div className='flex flex-col gap-1 min-w-0'>
                  <p className='text-[#171717] text-sm font-medium truncate max-w-[280px]' title={selectedFile.name}>
                    {selectedFile.name}
                  </p>
                  <div className='flex items-center gap-2 text-xs text-[#737373]'>
                    <span>{formatFileSize(selectedFile.size)}</span>
                    <span>•</span>
                    <span className='text-[10px] uppercase bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[#4B5565] font-semibold'>
                      {fileExtension}
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex items-center'>
                <button
                  type='button'
                  onClick={handleDelete}
                  className='p-2 hover:bg-red-50 rounded-full transition-colors cursor-pointer'
                  title={t('Delete') || 'Delete'}
                >
                  <img src="/images/icons/delete_red.svg" alt="delete" className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Calendar Deadline Time */}
          {showDatePicker && (
            <div
              className={`border border-dashed ${
                deadline
                  ? 'border-primary bg-white'
                  : 'border-[#CBD5E1]'
              } py-4 px-5 rounded-3px flex flex-col gap-2.5 transition-colors`}
            >
              <div className='flex justify-between'>
                <p className='flex items-center gap-2'>
                  <img src="/images/icons/calendar_yellow.svg" alt="calendar" className="w-4 h-4" />
                  <span className='text-sm font-medium text-[#1F2937] truncate'>
                    <span>{t('Expiry date')}</span>
                  </span>
                </p>
                <p className='text-[#9CA3AF] text-xs font-normal'>{t('Specify the expiry date')}</p>
              </div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={deadline}
                  onChange={updateDeadline}
                  format="DD/MM/YYYY"
                  maxDate={requirement?.minimum_validity_days ? dayjs().add(requirement.minimum_validity_days, 'day') : undefined}
                  slotProps={{
                    textField: {
                      placeholder: "DD / MM / YYYY",
                      fullWidth: true,
                      size: "small",
                      sx: {
                        backgroundColor: 'white',
                        '& .MuiInputBase-root': {
                          height: '45px',
                          borderRadius: '3px',
                          fontSize: '13px',
                          color: deadline ? 'var(--color-primary, #C69815)' : '#364152',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--color-primary, #C69815)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--color-primary, #C69815)',
                          },
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px',
                          textAlign: 'center',
                        },
                        '& .MuiSvgIcon-root': {
                          color: 'var(--color-primary, #C69815)',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Upload_Document

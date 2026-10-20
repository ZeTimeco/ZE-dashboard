'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

function Upload_CommercialRegister({
  file: propFile,
  onFileChange,
  deadlineDate: propDeadline,
  onDeadlineChange,
}) {
  const { t } = useTranslation()
  const fileInputRef = useRef(null)
  const [internalFile, setInternalFile] = useState(null)
  const [internalDeadline, setInternalDeadline] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

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
      updateFile(file)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    updateFile(null)
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

  return (
    <>
      <div className='w-full'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('commercial register')} </span>
          <span className=' text-[#F04438]'>*</span>
        </p>

        {/* Hidden file input */}
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          accept='.pdf,.jpg,.jpeg,.png'
          className='hidden'
        />

        <div className='grid grid-cols-3 gap-6 items-stretch'>
          {/* Upload Box (col-span-2) */}
          {!selectedFile ? (
            <div
              onClick={handleBoxClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border min-h-[135px] ${
                isDragging ? 'border-primary bg-primary/5' : 'border-[#CBD5E1] bg-[#FAFAFA]'
              } flex flex-col items-center gap-1 justify-center col-span-2 py-4 px-6 rounded-3px cursor-pointer hover:border-primary/60 transition-colors`}
            >
              <p><img src="/images/icons/upload_gray.svg" alt="" /></p>
              <p className='text-[#1F2937] text-sm font-normal'>{t('Upload a copy of the commercial registration.')}</p>
              <p className='text-[#9CA3AF] text-xs font-normal'>{t('Or drag the file here')}</p>
              <p className='bg-[#F0F2F5] p-3 w-fit rounded-3px text-[#6B7280] text-xs font-medium flex items-center gap-2'>
                <span>{t('Maximum size 5 MB')}</span>
                <span className='w-[1px] h-3 bg-[#CBD5E1] inline-block'></span>
                <span>PDF, JPG</span>
              </p>
            </div>
          ) : (
            <div className='border border-primary bg-white min-h-[135px] flex items-center justify-between col-span-2 py-4 px-6 rounded-3px transition-colors'>
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

          {/* Calendar Deadline Time (col-span-1) */}
          <div
            className={`col-span-1 border  ${
              deadline ? 'border-primary bg-white' : 'border-[#CBD5E1] bg-[#FAFAFA]'
            } py-4 px-5 rounded-3px flex flex-col  gap-2.5 transition-colors`}
          >
            <div className='flex items-center gap-2'>
              <img src="/images/icons/calendar_yellow.svg" alt="calendar" className="w-4 h-4" />
              <p className='text-sm font-medium text-[#1F2937] truncate'>
                <span>{t('Expiry date')}</span>
              </p>
            </div>
              <p className='text-[#9CA3AF] text-xs font-normal mb-4 mt-2'>{t('Specify the expiry date')}</p>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={deadline}
                onChange={updateDeadline}
                format="DD/MM/YYYY"
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
          
        </div>
      </div>
      
    </>
  )
}

export default Upload_CommercialRegister
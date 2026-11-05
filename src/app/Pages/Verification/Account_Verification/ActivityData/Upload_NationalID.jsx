'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

function NationalIDUploadSection({
  label,
  file,
  onFileChange,
  deadlineDate,
  onDeadlineChange,
  isIdentityInput = false,
  identityNumber,
  onIdentityNumberChange,
  showErrors = true,
  isRequired = true,
  boxPromptText,
  accept = '.pdf,.jpg,.jpeg,.png',
}) {
  const { t } = useTranslation()
  const fileInputRef = useRef(null)
  const [internalFile, setInternalFile] = useState(null)
  const [internalDeadline, setInternalDeadline] = useState(null)
  const [internalIdentityNumber, setInternalIdentityNumber] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  const selectedFile = file !== undefined ? file : internalFile
  const deadline = deadlineDate !== undefined ? deadlineDate : internalDeadline
  const currentIdentityNumber = identityNumber !== undefined ? identityNumber : internalIdentityNumber

  const minDate = dayjs().add(90, 'day')
  const isDateValid = Boolean(deadline && dayjs(deadline).isValid() && !dayjs(deadline).isBefore(minDate, 'day'))
  const isNumberValid = Boolean(currentIdentityNumber && currentIdentityNumber.toString().trim().length >= 10)

  const updateFile = (newFile) => {
    if (file === undefined) {
      setInternalFile(newFile)
    }
    if (onFileChange) {
      onFileChange(newFile)
    }
  }

  const updateDeadline = (newDate) => {
    if (deadlineDate === undefined) {
      setInternalDeadline(newDate)
    }
    if (onDeadlineChange) {
      onDeadlineChange(newDate)
    }
  }

  const updateIdentityNumber = (newNumber) => {
    if (identityNumber === undefined) {
      setInternalIdentityNumber(newNumber)
    }
    if (onIdentityNumberChange) {
      onIdentityNumberChange(newNumber)
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
    const chosenFile = e.target.files?.[0]
    if (chosenFile) {
      updateFile(chosenFile)
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
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      updateFile(droppedFile)
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

  const [showIdentityLimitError, setShowIdentityLimitError] = useState(false);
  return (
    <div className='w-full border border-[#E2E8F0] rounded-3px p-4'>
      <p className='text-sm font-medium mb-1.5'>
        <span className='text-[#364152]'>{label} </span>
        {isRequired && <span className='text-[#F04438]'>*</span>}
      </p>

      {/* Hidden file input */}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className='hidden'
      />

      <div className='flex flex-col gap-6 '>
        {/* Upload Box */}
        {!selectedFile ? (
          <div
            onClick={handleBoxClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border border-dashed ${
              isDragging
                ? 'border-primary '
                : 'border-[#CBD5E1] bg-[#F8FAFC80]'
            } flex flex-col justify-center items-center gap-2 py-4 px-6 rounded-3px cursor-pointer hover:border-primary/60 transition-colors`}
          >
            <div className='flex items-center'>
              <p>
                <img src="/images/icons/upload_yellow.svg" alt="" />
              </p>
            </div>

            <div className='flex flex-col items-center gap-1'>
              <p className='text-[#1F2937] text-sm font-normal'>
                {boxPromptText}
              </p>
              <p className='text-[#9CA3AF] text-xs font-normal'>{t('Or drag the file here')}</p>
            </div>
          </div>
        ) : (
          /* File uploaded preview */
          <div className='border border-primary bg-yellow-50 flex items-center justify-between py-4 px-6 rounded-3px transition-colors'>
            <div className='flex items-center gap-3.5 overflow-hidden'>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt='preview'
                  className='w-12 h-12 object-cover rounded-lg border border-primary/20 shrink-0'
                />
              ) : (
                <div className='w-12 h-12 rounded-lg bg-[#FDF7E8] flex items-center justify-center shrink-0 border border-[#F3E8C4]'>
                  <img
                    src="/images/icons/document-attachment-yellow.svg"
                    alt="file"
                    className="w-6 h-6"
                  />
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

        {/* Bottom Section: Expiry Date for Front ID OR Form Input for Back ID */}
        {!isIdentityInput ? (
          /* Calendar Deadline Time (Front ID) */
          <div
            className={` ${
              isDateValid
                ? 'border-primary bg-white'
                : 'border-[#CBD5E1]'
            } py-4 rounded-3px flex flex-col gap-2.5 transition-colors`}
          >
            <div className='flex justify-between items-center'>
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
                minDate={minDate}
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
                        color: isDateValid ? 'var(--color-primary, #C69815)' : '#364152',
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
            {deadline && !isDateValid && (
              <p className='text-[#F04438] text-xs font-medium'>
                {t('The expiry date must be at least 90 days from today.')}
              </p>
            )}
          </div>
        ) : (
          /* Form Input for National ID / Iqama Number (Back ID) */
          <div
            className={`${
              isNumberValid
                ? 'border-primary bg-white'
                : 'border-[#CBD5E1]'
            } py-4 rounded-3px flex flex-col gap-2.5 transition-colors`}
          >
            <div className="flex justify-between items-center">
              <p className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <line x1="6" y1="9" x2="10" y2="9" />
                  <line x1="6" y1="13" x2="14" y2="13" />
                  <circle cx="16" cy="9" r="1.5" />
                </svg>

                <span className="text-sm font-medium text-[#1F2937]">
                  {t('National ID / Iqama number')}
                </span>
              </p>
            </div>

            <input
              type="text"
              name="identityNumber"
              value={currentIdentityNumber || ''}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');

                if (val.length > 16) {
                  setShowIdentityLimitError(true);
                  return;
                }

                setShowIdentityLimitError(false);
                updateIdentityNumber(val);
              }}
              placeholder={t('Enter the national ID or Iqama number')}
              maxLength={17}
              inputMode="numeric"
              className={`w-full h-[45px] px-3 bg-white border ${
                showIdentityLimitError
                  ? 'border-[#F04438] focus:border-[#F04438]'
                  : 'border-[#C8C8C8] hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary/20'
              } rounded-3px text-sm text-[#364152] placeholder-[#9AA4B2] outline-none transition-all duration-200`}
            />

            {showIdentityLimitError && (
              <p className="text-[#F04438] text-xs font-medium">
                {t('ID number must not exceed 16 digits')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Upload_NationalID({
  // Front props
  frontFile,
  onFrontFileChange,
  frontDeadlineDate,
  frontDeadline,
  onFrontDeadlineChange,

  // Back props
  backFile,
  onBackFileChange,
  backDeadlineDate,
  backDeadline,
  onBackDeadlineChange,

  // National ID / Iqama number
  identityNumber,
  onIdentityNumberChange,

  // Global validation / control
  showErrors = true,
  isRequired = true,
  accept = '.pdf,.jpg,.jpeg,.png',
}) {
  const { t } = useTranslation()

  return (
    <div className='grid grid-cols-2 gap-6 w-full'>
      {/* Front National ID Card */}
      <NationalIDUploadSection
        label={t('Front national ID card photo')}
        boxPromptText={t('Upload a photo of the front of your national ID card')}
        file={frontFile}
        onFileChange={onFrontFileChange}
        deadlineDate={frontDeadlineDate !== undefined ? frontDeadlineDate : frontDeadline}
        onDeadlineChange={onFrontDeadlineChange}
        isIdentityInput={false}
        showErrors={showErrors}
        isRequired={isRequired}
        accept={accept}
      />

      {/* Back National ID Card */}
      <NationalIDUploadSection
        label={t('Back national ID card photo')}
        boxPromptText={t('Upload a photo of the back of your national ID card')}
        file={backFile}
        onFileChange={onBackFileChange}
        deadlineDate={backDeadlineDate !== undefined ? backDeadlineDate : backDeadline}
        onDeadlineChange={onBackDeadlineChange}
        isIdentityInput={true}
        identityNumber={identityNumber}
        onIdentityNumberChange={onIdentityNumberChange}
        showErrors={showErrors}
        isRequired={isRequired}
        accept={accept}
      />
    </div>
  )
}

export default Upload_NationalID

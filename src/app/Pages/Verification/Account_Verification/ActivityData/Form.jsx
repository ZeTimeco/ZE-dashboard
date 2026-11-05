'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Form({ formData, onFormDataChange, showErrors }) {
  const { t } = useTranslation()

  return (
    <div className='w-full'>
      {/* Detailed title of the activity */}
      <div className='w-full'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Detailed title of the activity')} </span>
          <span className=' text-[#F04438]'>*</span>
        </p>
        <input 
          type="text"
          name='detailedTitle'
          value={formData?.detailedTitle || ''}
          onChange={(e) => onFormDataChange?.('detailedTitle', e.target.value)}
          placeholder={t('Enter the detailed address (city, neighborhood, building number)')}
          className="w-full h-25 p-3 border border-[#C8C8C8] hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm text-[#364152] rounded-3px outline-none transition-all duration-200"
        />
      </div>
    </div>
  )
}

export default Form

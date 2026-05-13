import React from 'react'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import Header from './Header'


function AdvancedSettingsPages() {
    const {t} = useTranslation()
  
  return (
    <>
      <div className='border border-[#E3E8EF] '>
        <Header/>
        <div className='px-6 py-4'>
          <Content/>

          <button className='h-14 w-[20%] mt-12 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer'>
            {t('Save changes')}
          </button>
        </div>
      </div>

    </>
  )
}

export default AdvancedSettingsPages
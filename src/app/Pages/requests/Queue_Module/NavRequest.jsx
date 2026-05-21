import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function NavRequest() {
  const {t} = useTranslation()

  const filterCardStatus = [
    {id:1 , name:t('today') },
    {id:2 , name:t('The next one') },
    {id:3 , name:t('You need to take action') },  
    {id:4 , name:t('Complete')     },
  ]
  const [activeBtn, setActiveBtn] = useState(1)

  return (
    <>
    <section className='flex gap-6'>
      <SearchForm 
        placeholderKey="Search by order number"
      />
      <FilterBtn/>
    </section>

    <section className='grid grid-cols-4 gap-6 mt-10'>
      {filterCardStatus?.map((item)=>(
        <button
          key={item?.id}
          onClick={() => setActiveBtn(item?.id)}
          className={`
            rounded-full h-14 cursor-pointer border text-base font-normal transition-all duration-200
            ${
              activeBtn === item?.id
                ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#F9F5E8]'
                : 'border-[#CDD5DF] text-[#364152]'
            }
          `}
          >
            {item?.name}
        </button>
      ))}
      
    </section>

    </>
  )
}

export default NavRequest
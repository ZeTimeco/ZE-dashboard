import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import { getReservationsThunk } from '@/redux/slice/Requests/RequestsSlice'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

function NavRequest() {
  const { t } = useTranslation()

  // !completed !today !upcoming !needs_action
  const filterCardStatus = [
    { id: 1, name: t('today'), status: 'today' },
    { id: 2, name: t('The next one'), status: 'upcoming' },
    { id: 3, name: t('You need to take action'), status: 'needs_action' },
    { id: 4, name: t('Complete'), status: 'completed' },
  ]

  const [activeBtn, setActiveBtn] = useState(1)

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(
        getReservationsThunk({
          tab: 'today'
        })
      )
    }, [dispatch])
  const handleFilter = (item) => {
    setActiveBtn(item.id)

    dispatch(
      getReservationsThunk({
        tab: item.status
      })
    )
    console.log(item.status);
  }

  return (
    <>
      <section className='flex gap-6'>
        <SearchForm placeholderKey="Search by order number" />
        <FilterBtn />
      </section>

      <section className='grid grid-cols-4 gap-6 mt-10'>
        {filterCardStatus?.map((item) => (
          <button
            key={item?.id}
            onClick={() => handleFilter(item)}
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
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import { getReservationsThunk } from '@/redux/slice/Requests/RequestsSlice'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import FilterPage from './Dialog/Filter/page'
import { motion } from 'framer-motion'

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

  const [openFilter , setOpenFilter] = useState(false)

  return (
    <>
      <motion.section
        className='flex gap-6'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <SearchForm placeholderKey="Search by order number" />
        <FilterBtn onClick={() => setOpenFilter(true)} />
      </motion.section>

      <motion.section
        className='grid grid-cols-4 gap-6 mt-10'
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.08 }}
      >
        {filterCardStatus?.map((item, i) => (
          <motion.button
            key={item?.id}
            onClick={() => handleFilter(item)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.08 + i * 0.06 }}
            whileHover={{
              scale: 1.03,
              boxShadow: activeBtn === item?.id
                ? '0 4px 16px 0 rgba(var(--color-primary-rgb, 158,122,17), 0.18)'
                : '0 4px 12px 0 rgba(0,0,0,0.08)',
              transition: { duration: 0.18 },
            }}
            whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
            className={`
              rounded-full h-14 cursor-pointer border text-base font-normal transition-colors duration-200
              ${
                activeBtn === item?.id
                  ? 'border-primary text-primary bg-[#F9F5E8]'
                  : 'border-[#CDD5DF] text-[#364152] hover:border-[#b0bac8] hover:bg-[#f8f9fa]'
              }
            `}
          >
            {item?.name}
          </motion.button>
        ))}
      </motion.section>

      <FilterPage
        open={openFilter}
        setOpen={setOpenFilter}
      />
    </>
  )
}

export default NavRequest
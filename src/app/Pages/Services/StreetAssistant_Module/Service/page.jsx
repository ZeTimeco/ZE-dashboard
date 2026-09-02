'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import SidebarMenuPage from './SidebarMenu/page'
import SectionOfMenuPage from './SectionOfMenu/page'

function ServicePage() {
    const [selectedMenu, setSelectedMenu] = useState(40)
  return (
    <MainLayout>   
      <>
        <Header/>

        <div className="flex flex-col gap-6 mt-14">
          <div className='w-full'>
            <SidebarMenuPage selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
          </div>

          <AnimatePresence mode="sync">
            <motion.div
              key={selectedMenu}
              className='w-full'
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <SectionOfMenuPage selectedMenu={selectedMenu}/>
            </motion.div>
          </AnimatePresence>
        </div>
      </>
    </MainLayout>
  )
}

export default ServicePage
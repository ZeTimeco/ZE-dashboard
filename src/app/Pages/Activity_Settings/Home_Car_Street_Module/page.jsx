'use client'
import React, { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import SidebarMenuPage from './SidebarMenu/page';
import SectionOfMenuPage from './SectionOfMenu/page';
import Header from './Header';
import Loader from '@/app/Components/Loader/Loader';

function Activity_SettingsPage() {
  const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null
  const current_module_key = userData?.current_module_key

  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')

  const [selectedMenu, setSelectedMenu] = useState(() => {
    const parsed = parseInt(tabParam, 10)
    return !isNaN(parsed) ? parsed : 1
  })

  // Sync if tab param changes (e.g. navigated with different query)
  useEffect(() => {
    const parsed = parseInt(tabParam, 10)
    if (!isNaN(parsed)) {
      setSelectedMenu(parsed)
    }
  }, [tabParam])
  
  return (
    <>
      {/* {content} */}
      <MainLayout>
        <Header current_module_key={current_module_key}/>
          <Suspense fallback={<Loader />}>
            <div className="flex flex-col gap-14 mt-14">
              <SidebarMenuPage selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
              <SectionOfMenuPage selectedMenu={selectedMenu}/>
            </div>
          </Suspense>
      </MainLayout>
    </>
  )
}

export default Activity_SettingsPage

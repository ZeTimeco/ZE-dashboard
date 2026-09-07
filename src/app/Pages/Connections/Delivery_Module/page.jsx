import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import FreelancePage from './Freelance/page'
import CompanyPage from './Company/page'

function Delivery_ModulePage() {
  const role = 'Freelance'
  return (
    <MainLayout>
      {role === 'Freelance' && <FreelancePage />}
      {role === 'Company' && <CompanyPage />}
          
    </MainLayout>
  )
}

export default Delivery_ModulePage
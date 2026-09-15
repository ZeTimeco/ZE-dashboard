import React from 'react'
import TitlePage from './Title/page'
import BoxPage from './Box/page'
import ActiveConnectionPage from './ActiveConnection/page'

function CompanyPage() {
  return (
    <div>
      <TitlePage/>
      
      <BoxPage/>

      <ActiveConnectionPage/>
    </div>
  )
}

export default CompanyPage
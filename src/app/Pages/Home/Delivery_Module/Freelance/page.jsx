import React from 'react'
import BoxPage from './Box/page'
import TitlePage from './Title/page'
import Card from './Cards/Card'
import NoCards from './Cards/NoCards'

function FreelancePage() {
  return (
    <div>
      <TitlePage/>
      <BoxPage/>
      
      <Card/>
      {/* <NoCards/> */}
    </div>
  )
}

export default FreelancePage
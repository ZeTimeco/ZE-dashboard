"use client"
import React, { useEffect, useState } from 'react'
import Home_Car_Street_Module from './Home_Car_Street_Module/Services/page';
import Property_Module from './Property_Module/Services/page';

function HomePage() {
    const [current_module_key, setCurrentModuleKey] = useState(null)
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'))
      setCurrentModuleKey(userData?.current_module_key ?? null)
    }, [])


    let content ;

    if (current_module_key === 'home_services' || current_module_key === 'car_services' || current_module_key === 'street_assistant') {
      content = <Home_Car_Street_Module />
    } else if (current_module_key === 'property_rental') {
      content = <Property_Module />
    } else {
      content = <div>No module selected</div>
    }
  return (
    <>
    {content}
    </>
  )
}

export default HomePage
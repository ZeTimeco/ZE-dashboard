"use client"
import React from 'react'
import MainLayout from '../../Components/MainLayout/MainLayout'
import { useTranslation } from 'react-i18next'
import Header from './Header';
import Box from './Box';

function Pending_ListPage() {
  const {t} = useTranslation();

  return (
    <MainLayout>
      <Header/>

      <Box />
      
    </MainLayout>
  )
}

export default Pending_ListPage
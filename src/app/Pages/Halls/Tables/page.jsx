'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import No_Tables_Add from './No_Tables_Add';

function TablesPage() {


  return (
    <MainLayout>
      
      <No_Tables_Add/>
    </MainLayout>
  )
}

export default TablesPage
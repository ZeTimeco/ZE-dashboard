'use client'

import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useRouter } from 'next/navigation'
import React from 'react'

function AddPage() {
  const router = useRouter()

  return (
    <MainLayout>
      <button
        type="button"
        onClick={() => router.back()}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
      >
        Back
      </button>
    </MainLayout>
  )
}

export default AddPage
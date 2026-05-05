"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import RoomPage from './Room/page';
import BathroomPage from './Bathroom/page';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/app/Components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addUnitsThunk, getUnitsThunk } from '@/redux/slice/Services/ServicesSlice';

const createRoom = () => ({
  id: Date.now() + Math.random(),
  isOpen: true,
  open1: false,
  selected1: null,
  searchValue1: '',
  images: [],
  previewImages: [],
  beds: [],
  features: [],
});

const createBathroom = () => ({
  id: Date.now() + Math.random(),
  isOpen: true,
  open1: false, selected1: null, searchValue1: '',
  open2: false, selected2: null, searchValue2: '',
  images: [], previewImages: [],
  selectedFeature: null,
});

function RoomsAndBathroomsPageContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const dispatch = useDispatch()
  const { getUnits } = useSelector((state) => state.services)
  const getUnitsData = getUnits?.data

  const [formData, setFormData] = useState({ property_id: '', rooms: [], bathrooms: [] })
  const [roomsOpen, setRoomsOpen] = useState(true);
  const [bathroomsOpen, setBathroomsOpen] = useState(true);

  useEffect(() => {
    if (id) setFormData((prev) => ({ ...prev, property_id: id }))
  }, [id])

  useEffect(() => {
    if (id) dispatch(getUnitsThunk(id))
  }, [id])

  useEffect(() => {
    if (getUnitsData) {
      setFormData((prev) => ({
        ...prev,
        rooms: (getUnitsData.rooms || []).map((room) => ({
          id: room.id,
          room_type_id: room.room_type?.id,
          isOpen: false,
          open1: false,
          selected1: room.room_type?.name || null,
          searchValue1: '',
          images: [],
          previewImages: (room.photos || []).map((p) => p.path),
          beds: (room.beds || []).map((b) => ({
            id: b.id,
            bed_type_id: b.bed_type?.id,
            selected: b.bed_type?.name || null,
            searchValue: '',
            open: false,
            counter: b.count || 1,
          })),
          features: (room.amenities || []).map((a) => a.id),
        })),
        bathrooms: (getUnitsData.bathrooms || []).map((b) => ({
          id: b.id,
          bathroom_type_id: b.bathroom_type?.id,
          location_value: b.location,
          access_type: b.access_type,
          isOpen: false,
          open1: false, selected1: b.bathroom_type?.name || null, searchValue1: '',
          open2: false, selected2: b.location || null, searchValue2: '',
          images: [],
          previewImages: (b.photos || []).map((p) => p.path),
          selectedFeature: b.access_type === 'private' ? 1 : b.access_type === 'public' ? 2 : null,
        })),
      }));
    }
  }, [getUnitsData]);

  // --- Room handlers ---
  const addRoom = () => setFormData(prev => ({ ...prev, rooms: [...prev.rooms, createRoom()] }));
  const deleteRoom = (rid) => setFormData(prev => ({ ...prev, rooms: prev.rooms.filter(r => r.id !== rid) }));
  const updateRoom = (rid, changes) => setFormData(prev => ({
    ...prev, rooms: prev.rooms.map(r => r.id === rid ? { ...r, ...changes } : r)
  }));

  // --- Bathroom handlers ---
  const addBathroom = () => setFormData(prev => ({ ...prev, bathrooms: [...prev.bathrooms, createBathroom()] }));
  const deleteBathroom = (bid) => setFormData(prev => ({ ...prev, bathrooms: prev.bathrooms.filter(b => b.id !== bid) }));
  const updateBathroom = (bid, changes) => setFormData(prev => ({
    ...prev, bathrooms: prev.bathrooms.map(b => b.id === bid ? { ...b, ...changes } : b)
  }));

  const handleSave = async () => {
    try {
      const isNewId = (id) => !id || id > 1_000_000_000;

      // --- Clean rooms: keep only rooms with a room_type_id ---
      const cleanRooms = formData.rooms
        .filter((room) => room.room_type_id)
        .map((room) => {
          const r = {
            room_type_id: room.room_type_id,
            amenities: (room.features || []).filter(Boolean),
            beds: (room.beds || [])
              .filter((bed) => bed.bed_type_id)
              .map((bed) => {
                const b = { bed_type_id: bed.bed_type_id, count: bed.counter || 1 };
                if (!isNewId(bed.id)) b.id = bed.id;
                return b;
              }),
          };
          if (!isNewId(room.id)) r.id = room.id;
          return r;
        });

      // --- Clean bathrooms: keep only those with all 3 required fields ---
      const cleanBathrooms = formData.bathrooms
        .filter((b) => b.bathroom_type_id && b.location_value && b.access_type)
        .map((b) => {
          const bath = {
            bathroom_type_id: b.bathroom_type_id,
            location: b.location_value,
            access_type: b.access_type,
          };
          if (!isNewId(b.id)) bath.id = b.id;
          return bath;
        });

      const payload = {
        property_id: formData.property_id,
        rooms: cleanRooms,
        bathrooms: cleanBathrooms,
      };

      console.log('Payload:', payload);

      const result = await dispatch(addUnitsThunk(payload))
      if (result?.meta?.requestStatus === "fulfilled") {
        router.push(`/Pages/Services/Property_Module/Service/Edit?id=${formData.property_id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }


  console.log('getUnitsData', getUnitsData);

  return (
    <MainLayout>
      <TitleOfHeader />
      <div className='border border-[#E6E6E6] p-8 rounded-[3px] mb-4'>

        {/* Page header */}
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 3 : </span>
            <span>{t('Rooms and bathrooms')}</span>
          </p>
          <div className='border border-[#CDD5DF] mt-4'></div>
        </div>

        {/* Rooms Accordion */}
        <div className='border border-[#CDD5DF] rounded-[3px] mt-6'>
          {/* Header - always visible */}
          <div className='w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC]'>
            <button
              type="button"
              onClick={() => setRoomsOpen(!roomsOpen)}
              className='flex items-center gap-2 flex-1 cursor-pointer'
            >
              <img src="/images/icons/bed-single-blue.svg" className="w-5 h-5" alt="" />
              <span className='text-[#364152] text-base font-medium'>{t('Room Information')}</span>
            </button>
            <button type="button" onClick={() => setRoomsOpen(!roomsOpen)} className='cursor-pointer'>
                <img
                  src="/images/icons/ArrowDown.svg"
                  className={`w-4 h-4 transition-transform duration-200 ${roomsOpen ? 'rotate-180' : ''}`}
                  alt=""
                />
              </button>
          </div>
          {/* Collapsible content */}
          {roomsOpen && (
            <div className='p-4'>
              <RoomPage
                rooms={formData.rooms}
                updateRoom={updateRoom}
                deleteRoom={deleteRoom}
                addRoom={addRoom}
              />
            </div>
          )}
        </div>

        {/* Bathrooms Accordion */}
        <div className='border border-[#CDD5DF] rounded-[3px] mt-4'>
          {/* Header - always visible */}
          <div className='w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC]'>
            <button
              type="button"
              onClick={() => setBathroomsOpen(!bathroomsOpen)}
              className='flex items-center gap-2 flex-1 cursor-pointer'
            >
              <img src="/images/icons/bathtub-blue.svg" className="w-5 h-5" alt="" />
              <span className='text-[#364152] text-base font-medium'>{t('Bathroom information')}</span>
            </button>
          <button type="button" onClick={() => setBathroomsOpen(!bathroomsOpen)} className='cursor-pointer'>
                <img
                  src="/images/icons/ArrowDown.svg"
                  className={`w-4 h-4 transition-transform duration-200 ${bathroomsOpen ? 'rotate-180' : ''}`}
                  alt=""
                />
              </button>
          </div>
          {/* Collapsible content */}
          {bathroomsOpen && (
            <div className='p-4'>
              <BathroomPage
                bathrooms={formData.bathrooms}
                updateBathroom={updateBathroom}
                deleteBathroom={deleteBathroom}
                addBathroom={addBathroom}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex mt-6">
          <div className='flex gap-2 justify-start w-full'>
            <button
              type="button"
              onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit?id=${id}`)}
              className="h-15 w-[15%] border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
            >
              {t('Return')}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="h-15 w-[15%] bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
            >
              {t('Save changes')}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default function RoomsAndBathroomsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <RoomsAndBathroomsPageContent />
    </Suspense>
  )
}
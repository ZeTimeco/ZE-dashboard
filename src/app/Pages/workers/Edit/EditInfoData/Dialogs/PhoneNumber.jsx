"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';
import { countryCodes } from '@/data/countryCodes';

function PhoneNumber({openPhoneNumber , setOpenPhoneNumber ,worker}) {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.workers);

  const [phone , setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+966");

  // Country Code Dropdown
  const [openCountry, setOpenCountry] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const dropdownRefCountry = useRef(null);

  const selectedCountry = countryCodes.find((c) => 
    c.code === countryCode || 
    c.id === countryCode || 
    c.code.replace('+', '') === countryCode?.toString().replace('+', '')
  ) || countryCodes.find((c) => c.id === 'sa') || countryCodes[0];

  const filteredCountries = countryCodes.filter((c) => {
    const q = searchCountry.toLowerCase().trim();
    if (!q) return true;
    return (
      c.code.includes(q) ||
      c.nameAr.includes(q) ||
      c.nameEn.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefCountry.current && !dropdownRefCountry.current.contains(event.target)) {
        setOpenCountry(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', worker?.id);
    formData.append('phone', phone);
    formData.append('country_code', selectedCountry?.code || countryCode);
    
    const result = await dispatch(UpdateWorkerThunk(formData));
    if (UpdateWorkerThunk.fulfilled.match(result)) {
      setOpenPhoneNumber(false);
    }
  };

  useEffect(()=>{
    if(worker?.phone){
      setPhone(worker?.phone.toString().replace(/\D/g, ''))
    }

    if(worker?.country_code){
      setCountryCode(worker?.country_code)
    }
  } , [worker , openPhoneNumber])

  return (
    <>
      <Dialog 
        open={openPhoneNumber} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog", style: { overflow: 'visible' } }}
      >
        <button className='pt-8 px-6 pb-2 cursor-pointer flex justify-end w-full' onClick={()=>setOpenPhoneNumber(false)}>
          <span className='border border-[#DDD] rounded-[100%] w-10 h-10 flex justify-center items-center hover:bg-gray-50 transition-colors'>
            <img src="/images/icons/xx.svg" alt="" className="transition-transform duration-200 hover:rotate-90" />
          </span>
        </button>
        
        <div className='flex flex-col gap-5 items-center justify-center mb-8'>
          {/* icon */}
          <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center shadow-xs'>
            <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/call-received.svg" className="w-7.5 h-7.5" alt="" />
            </div>
          </div>

          {/* title */}
          <p className='text-[var(--color-primary)] text-xl font-bold'>{t('Change mobile number')}</p>
        </div>

        <div className='px-6'>
          {/* Mobile number */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-base font-normal mb-3 block">
              {t("Mobile number")}
            </label>

            <div className="flex items-start w-full">
              {/* Phone Number Input */}
              <div className="flex-1">
                <input
                  type="tel"
                  name="phone"
                  value={phone || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setPhone(val);
                  }}
                  placeholder="000000000"
                  className="h-15 p-3 w-full border border-l-0 rounded-3px rounded-l-none border-[#C8C8C8] placeholder-[#9A9A9A] placeholder:text-sm outline-none transition focus:border-primary text-[#364152]"
                />
              </div>

              {/* Country code dropdown */}
              <div className="relative w-[130px] sm:w-[150px] shrink-0" ref={dropdownRefCountry}>
                <div
                  onClick={() => setOpenCountry(!openCountry)}
                  className="h-15 px-3 flex items-center justify-between border border-[#C8C8C8] hover:border-[#9AA4B2] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 rounded-3px rounded-r-none cursor-pointer bg-white transition-all duration-200 select-none"
                >
                  <span className="truncate">
                    {selectedCountry ? (
                      <span className="flex items-center gap-2 text-[#364152]">
                        <img
                          src={`https://flagcdn.com/w40/${selectedCountry.id}.png`}
                          alt={selectedCountry.nameEn}
                          className="w-5 h-3.5 object-cover rounded-xs border border-gray-200 shrink-0"
                          loading="lazy"
                        />
                        <span dir="ltr">{selectedCountry.code}</span>
                      </span>
                    ) : (
                      <span className="text-[#9A9A9A]">{t("Select") || "اختار"}</span>
                    )}
                  </span>
                  <span className={`cursor-pointer transition-transform duration-200 shrink-0 ${openCountry ? 'rotate-180' : ''}`}>
                    <img src="/images/icons/ArrowDown.svg" alt="toggle" />
                  </span>
                </div>

                {openCountry && (
                  <div className="absolute left-0 right-auto sm:left-0 top-full mt-1 w-[260px] max-w-[90vw] border border-[#C8C8C8] bg-white rounded-3px shadow-xl z-50 overflow-hidden">
                    {/* Search box */}
                    <div className="p-2 border-b border-gray-100 bg-[#FAFAFA]">
                      <input
                        type="text"
                        autoFocus
                        placeholder={t("Search") || "بحث..."}
                        value={searchCountry}
                        onChange={(e) => setSearchCountry(e.target.value)}
                        className="w-full h-9 px-3 text-xs sm:text-sm bg-white border border-[#C8C8C8] rounded-3px outline-none focus:border-primary text-[#364152] placeholder-[#9A9A9A]"
                      />
                    </div>

                    {/* Countries list */}
                    <ul className="max-h-52 overflow-y-auto">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((c) => (
                          <li
                            key={c.id}
                            onClick={() => {
                              setCountryCode(c.code);
                              setSearchCountry("");
                              setOpenCountry(false);
                            }}
                            className={`px-3 py-2.5 hover:bg-[#F5F5F5] cursor-pointer flex items-center justify-between transition-colors text-sm ${
                              (selectedCountry?.code === c.code || selectedCountry?.id === c.id) ? 'bg-primary/10 text-primary font-medium' : 'text-[#364152]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <img
                                src={`https://flagcdn.com/w40/${c.id}.png`}
                                alt={c.nameEn}
                                className="w-5 h-3.5 object-cover rounded-xs border border-gray-200 shrink-0"
                                loading="lazy"
                              />
                              <span className="truncate">{i18n?.language === 'en' ? c.nameEn : c.nameAr}</span>
                            </div>
                            <span className="text-xs font-semibold text-gray-500 shrink-0 ml-2" dir="ltr">{c.code}</span>
                          </li>
                        ))
                      ) : (
                        <li className="p-4 text-center text-xs text-gray-400">
                          {t("No entries to show") || "لا توجد نتائج"}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='my-6 flex gap-3'>
            <motion.button 
              whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className='w-full h-15 bg-[var(--color-primary)] text-[#fff] cursor-pointer rounded-[3px] flex justify-center items-center disabled:opacity-50 font-medium shadow-xs transition-all'
            >
              {loading ? t('loading...') : t('save')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(198, 152, 21, 0.04)" }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>setOpenPhoneNumber(false)} 
              className='w-full h-15 border border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer rounded-[3px] flex justify-center items-center font-medium transition-colors'
            >
              {t('cancel')}
            </motion.button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default PhoneNumber

"use client";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slice/Auth/AuthSlice';
import { motion, AnimatePresence } from 'framer-motion';

function SidebarFoodDelivery({ isSidebarOpen, setIsSidebarOpen }) {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const pathname = usePathname();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());      
    setIsSidebarOpen(false);
    router.push("/Auth/Login"); 
  };

  const navItems = [
    { key: 'Requests', path: '/Pages/requests/FoodDelivery_Module', icon: '/images/icons/Requests.svg' },
    { key: 'menu', path: '/Pages/Menus/FoodDelivery_Module', icon: '/images/icons/dish-black.svg' },
    { key: 'Delivery', path: '/Pages/Delivery/FoodDelivery_Module', icon: '/images/icons/delivery-truck.svg' },
    { key: 'Finance', path: '/Pages/finance', icon: '/images/icons/Finance.svg' },
    { key: 'Subscription', path: '/Pages/Subscription', icon: '/images/icons/Subscription.svg' },
    { key: 'Reports', path: '/Pages/Reports/FoodDelivery_Module', icon: '/images/icons/analytics-black.svg' },
    { key: 'conversations', path: '/Pages/conversations', icon: '/images/icons/conversations.svg' },
    { key: 'technical support', path: '/Pages/technicalSupport', icon: '/images/icons/dashboard.svg' },
    { key: 'Activity settings', path: '/Pages/Activity_Settings', icon: '/images/icons/Activity_settings.svg' },
    { key: 'Settings', path: '/Pages/settings', icon: '/images/icons/settings.svg' },
  ];

  return (
    <motion.aside
      animate={{ width: open ? 280 : 80 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg1:translate-x-0"}   
        lg1:flex flex-col h-screen border-x border-[#E3E8EF] p-4
        bg-white fixed lg1:static z-50 top-0 right-0 shadow-lg lg1:shadow-none
        select-none overflow-hidden
      `}
    >
      {/* Logo open and close */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          if (window.innerWidth >= 1340) { 
            setOpen(!open);
          }
        }}
        className="w-full flex justify-center mt-6 mb-8 cursor-pointer focus:outline-none"
        aria-label="Toggle sidebar"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div 
              key="full-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className='flex gap-2 items-center'
            >
              <img src='/images/LogoText.svg' alt="Zetime" className="h-7" />
              <img src='/images/Logo.svg' alt="Zetime Logo" className="h-7" />
            </motion.div>
          ) : (
            <motion.div 
              key="mini-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className='flex items-center'
            >
              <img src='/images/Logo.svg' alt="Zetime Logo" className="h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <ul className='flex flex-col gap-1.5 h-full'>
          {navItems.map((item) => {
            const isActive = item.path === '/Pages/Home'
              ? (pathname === '/' || pathname.startsWith('/Pages/dashboard') || pathname.startsWith('/Pages/Home'))
              : pathname.startsWith(item.path);

            return (
              <motion.li
                key={item.key}
                whileHover={{ x: open ? 4 : 0, scale: open ? 1 : 1.08 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <Link 
                  href={item.path} 
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center w-full h-11 px-3 rounded-lg transition-colors duration-150 relative ${
                    isActive 
                      ? "bg-[var(--color-primary)] text-white shadow-xs font-semibold" 
                      : "hover:bg-slate-100/80 text-[#364152]"
                  }`}
                >
                  {open ? (
                    <div className='flex gap-3.5 items-center w-full'>
                      <motion.img 
                        whileHover={{ rotate: 10 }}
                        src={item.icon} 
                        alt="" 
                        className={`w-5 h-5 transition-transform shrink-0 ${isActive ? "brightness-0 invert" : ""}`} 
                      />
                      <span className="text-sm font-medium leading-none whitespace-nowrap">
                        {t(item.key)}
                      </span>
                    </div>
                  ) : (
                    <div className='flex justify-center items-center w-full'>
                      <motion.img 
                        whileHover={{ scale: 1.15 }}
                        src={item.icon} 
                        alt="" 
                        className={`w-5 h-5 shrink-0 ${isActive ? "brightness-0 invert" : ""}`} 
                      />
                    </div>
                  )}
                </Link>
              </motion.li>
            );
          })}

          {/* Sign out */}
          <motion.li
            whileHover={{ x: open ? 4 : 0, scale: open ? 1 : 1.08 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={handleLogout}
            className="mt-auto pt-2"
          >
            <button className="flex items-center w-full h-11 px-3 rounded-lg hover:bg-red-50 text-[#D92D20] transition-colors cursor-pointer focus:outline-none">
              {open ? (
                <div className='flex gap-3.5 items-center w-full'>
                  <img src="/images/icons/signout.svg" alt="" className="w-5 h-5 shrink-0" />
                  <span className='text-[#D92D20] text-sm font-medium leading-none whitespace-nowrap'>{t('Sign out')}</span>
                </div>
              ) : (
                <div className='flex justify-center items-center w-full'>
                  <img src="/images/icons/signout.svg" alt="" className="w-5 h-5 shrink-0" />
                </div>
              )}
            </button>
          </motion.li>
        </ul>
      </nav>
    </motion.aside>
  );
}

export default SidebarFoodDelivery;

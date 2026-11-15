"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';

function FilterBtn({ href, className = "", onClick, isActive = false, count = 0 }) {
  const { t } = useTranslation();

  return (
    <button 
      type="button"
      onClick={onClick}
      className={`
        relative
        flex gap-2.5  
        justify-center items-center
        border h-14 min-w-[150px] px-4
        rounded-[3px]
        cursor-pointer transition-all duration-200
        ${isActive 
          ? 'bg-[#FFF9EA] border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/25 shadow-sm' 
          : 'bg-white border-[var(--color-primary)] hover:bg-[#F9F5E8]/40'
        }
        ${className}
      `}
      title={isActive ? t('Filter applied') || 'فلتر مطبق' : t('filter')}
    >
      {/* Corner Indicator Badge */}
      {isActive && (
        <span className="absolute -top-2 ltr:-right-2 rtl:-left-2 flex h-5 min-w-5 z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
          <span className="relative inline-flex items-center justify-center rounded-full h-5 min-w-5 px-1 bg-[var(--color-primary)] text-white text-[11px] font-bold shadow-sm border-2 border-white">
            {count > 0 ? count : (
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </span>
        </span>
      )}

      {/* Main Filter Icon */}
      <img src="/images/icons/FlterIcon.svg" alt="filter" className='w-6 h-6 shrink-0' />
      
      {/* Button Text */}
      <span className='text-[var(--color-primary)] text-base font-semibold'>{t('filter')}</span>

      {/* Active Filter Checkmark Icon */}
      {isActive && (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-primary)] text-white shadow-xs shrink-0 animate-in fade-in zoom-in duration-200">
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
            <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </button>
  );
}

export default FilterBtn;

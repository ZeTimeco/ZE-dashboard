
"use client";
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SidebarProperty from './Sidebar/SidebarProperty';
import SidebarQueue from './Sidebar/SidebarQueue';
import SidebarHomeCarStreet from './Sidebar/SidebarHomeCarStreet';
import SidebarFoodDelivery from './Sidebar/SidebarFoodDelivery';
import SidebarDelivery from './Sidebar/SidebarDelivery';

// ─── Sidebar Skeleton ─────────────────────────────────────────────────────────
function SidebarSkeleton() {
  return (
    <aside className="hidden lg1:flex flex-col h-screen w-[280px] shrink-0 border-x border-[#E3E8EF] pt-4 pb-4 bg-white select-none overflow-hidden">
      {/* Logo placeholder */}
      <div className="flex items-center gap-2 px-4 mb-6">
        <div className="h-7 w-7 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Section label */}
      <div className="px-4 mb-2">
        <div className="h-2.5 w-10 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-2 px-3">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 h-11 px-3 rounded-3px"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="h-5 w-5 rounded bg-gray-200 animate-pulse shrink-0" />
            <div
              className="h-3 rounded bg-gray-200 animate-pulse flex-1"
              style={{ width: `${60 + (i % 3) * 15}%` }}
            />
          </div>
        ))}
      </div>

      {/* Settings label */}
      <div className="px-4 mt-6 mb-2">
        <div className="h-2.5 w-14 rounded bg-gray-200 animate-pulse" />
      </div>
      <div className="flex flex-col gap-2 px-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 h-11 px-3 rounded-3px">
            <div className="h-5 w-5 rounded bg-gray-200 animate-pulse shrink-0" />
            <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Sign out */}
      <div className="mt-auto px-3 pt-2 border-t border-[#E3E8EF]">
        <div className="flex items-center gap-3 h-11 px-3">
          <div className="h-5 w-5 rounded bg-gray-200 animate-pulse shrink-0" />
          <div className="h-3 w-16 rounded bg-red-100 animate-pulse" />
        </div>
      </div>
    </aside>
  );
}

// ─── Content Skeleton ─────────────────────────────────────────────────────────
function ContentSkeleton() {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Navbar skeleton */}
      <div className="h-16 border-b border-[#E3E8EF] bg-white flex items-center px-6 gap-4 shrink-0">
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex-1" />
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-8 w-28 rounded-full bg-gray-200 animate-pulse" />
      </div>

      {/* Page content skeleton */}
      <div className="flex-1 overflow-y-auto lg1:pt-8 pt-10 px-6 space-y-5">
        <div className="h-8 w-48 rounded bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-gray-100 animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
        <div className="h-64 rounded-xl bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}

// ─── Main Layout ──────────────────────────────────────────────────────────────
function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [current_module_key, setCurrentModuleKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setCurrentModuleKey(userData?.current_module_key ?? null);
    // Small delay so the skeleton is visible even on fast reads (prevents flash)
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const sidebarProps = { isSidebarOpen, setIsSidebarOpen };

  const renderSidebar = () => {
    if (current_module_key === "home_services" || current_module_key === "car_services" || current_module_key === "street_assistant") {
      return <SidebarHomeCarStreet {...sidebarProps} />;
    }
    if (current_module_key === "property_rental") return <SidebarProperty {...sidebarProps} />;
    if (current_module_key === "queue") return <SidebarQueue {...sidebarProps} />;
    if (current_module_key === "food_delivery") return <SidebarFoodDelivery {...sidebarProps} />;
    if (current_module_key === "delivery") return <SidebarDelivery {...sidebarProps} />;
    return null;
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg1:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {isLoading ? (
        /* ── Loading skeleton ── */
        <>
          <SidebarSkeleton />
          <ContentSkeleton />
        </>
      ) : (
        /* ── Real layout ── */
        <>
          {renderSidebar()}

          <div className="flex flex-1 flex-col overflow-hidden">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="flex-1 overflow-y-auto lg1:pt-8 pt-10 px-6">
              {children}
            </main>
          </div>
        </>
      )}
    </div>
  );
}

export default MainLayout;

"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import MainLayout from "@/app/Components/MainLayout/MainLayout";
import AddBtn from "@/app/Components/Buttons/AddBtn";
import SearchForm from "@/app/Components/Forms/SearchForm";
import FilterBtn from "@/app/Components/Buttons/FilterBtn";
import ServiceCard from "@/app/Components/Cards/ServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllServicesThunk } from "@/redux/slice/Services/ServicesSlice";
import Pagination from "./Pagination";
import { CircularProgress } from "@mui/material";
import No_services_Add from "./No_services_Add";

const FiltersPage = dynamic(() => import("./Filters/page"), { ssr: false });

function ServicePage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [filterParams, setFilterParams] = useState({});

  const handleApplyFilters = (filters) => {
    setFilterParams((prev) => {
      const newParams = { ...prev };
      // Handle Status: If present in filters, update it. If empty array, remove it.
      if (filters.hasOwnProperty('status')) {
        if (Array.isArray(filters.status) && filters.status.length === 0) {
          delete newParams.status;
        } else {
          newParams.status = filters.status;
        }
      }
      return newParams;
    });
    setCurrentPage(1);
    handleClose();
  };

  const handleReset = () => {
    setFilterParams({});
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setFilterParams((prev) => {
      const newParams = { ...prev, search: term };
      if (!term) delete newParams.search;
      return newParams;
    });
    setCurrentPage(1);
  };

  //link api data to cards
  const dispatch = useDispatch();
  const { services, loading, error, pagination } = useSelector((state) => state.services);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    dispatch(getAllServicesThunk({ page: currentPage, per_page: perPage, ...filterParams }));
  }, [dispatch, currentPage, perPage, filterParams]);

  const handlePageChange = (page) => setCurrentPage(page);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <MainLayout>
      {loading || services?.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full"
        >
          <section>
            {/* 📱 Mobile / Tablet Header */}
            <div className="lg1:hidden flex justify-between mb-8 items-center">
              <p className="text-[#000] text-2xl font-medium flex items-center tracking-tight">
                {t("Services")}
              </p>
              <div className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                <AddBtn               
                  href="/Pages/Services/Home_Car_Module/Service/Add"
                  label="Add a sub-service" 
                />
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div className="flex-1">
                <SearchForm 
                  placeholderKey="Search by worker name, job title, or phone number" 
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="lg1:flex lg1:gap-4 gap-6 items-center">
                <div className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  <FilterBtn onClick={handleClickOpen} />
                </div>
                <div className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  <AddBtn
                    href="/Pages/Services/Home_Car_Module/Service/Add"
                    label="Add a sub-service"
                    className="hidden lg1:flex"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 w-full mb-8">
            {loading ? (
              <section className="grid grid-cols-2 gap-4 lg1:grid-cols-3 lg1:gap-6">
                <div className="flex justify-center items-center h-60 w-full col-span-full">
                  <CircularProgress color="warning" size={60} />
                </div>
              </section>
            ) : !error && services?.length > 0 ? (
              <motion.section 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-4  lg1:grid-cols-3 lg1:gap-6"
              >
                {services.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </motion.section>
            ) : null}
          </section>
          
          <Pagination
            totalPages={pagination?.last_page || 1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </motion.div>
      ) : (
        <No_services_Add />
      )}

      <FiltersPage 
        open={open} 
        handleClose={handleClose} 
        onApply={handleApplyFilters}
        onReset={handleReset}
        currentFilters={filterParams}
      />
    </MainLayout>
  );
}

export default ServicePage;

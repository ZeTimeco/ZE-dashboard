"use client";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/app/Components/MainLayout/MainLayout";
import Link from "next/link";
import EditInfoDataPage from "./EditInfoData/page";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { getWorkerByIdThunk } from "@/redux/slice/Workers/WorkersSlice";
import Loader from "@/app/Components/Loader/Loader";

function EditPageContent() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { worker, loading } = useSelector((state) => state.workers);

  useEffect(() => {
    if (id) {
      dispatch(getWorkerByIdThunk(id));
    }
  }, [id]);

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col"
      >
        {/* Header */}
        <section className="mb-8 flex justify-between items-center">
          {/* title */}
          <div>
            <p className="text-[#364152] text-2xl font-medium mb-2 tracking-tight">
              {t("Worker details")}
            </p>
            <p className="text-[#4B5565] text-base font-normal">
              {t("Review and edit employee data easily to maintain accurate and up-to-date information.")}
            </p>
          </div>

          {/* btn back to table */}
          <div className="flex items-center">
            <Link 
              href='/Pages/workers' 
              className="w-48 h-14 flex items-center justify-center border border-[var(--color-primary)] rounded-[3px] text-[var(--color-primary)] text-base font-medium cursor-pointer transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] hover:bg-[rgba(198,152,21,0.04)]"
            >
              {t('Return to the workers page')}
            </Link>
          </div>
        </section>
        
        <section className="mb-6">
          <EditInfoDataPage worker={worker} loading={loading} />
        </section>
      </motion.div>
    </MainLayout>
  );
}

function EditPage() {
  return (
    <Suspense fallback={<Loader />}>
      <EditPageContent />
    </Suspense>
  );
}

export default EditPage;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { UpdateInSignupThunk } from "@/redux/slice/Auth/AuthSlice";
import { getProfileThunk, updateProfileImageThunk } from "@/redux/slice/Setting/SettingSlice";
import { IMAGE_BASE_URL } from "../../../../../../../config/imageUrl";
import { toast } from "react-toastify";

function BasicInformationPage({userData}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    company_name: userData?.company_name || "",
    short_bio: userData?.short_bio || "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        company_name: userData.company_name || "",
        short_bio: userData.short_bio || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "image/webp",
      "image/png",
      "image/svg+xml",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(t("Please select a valid image file (WEBP, PNG, SVG, JPG)"));
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error(t("File size should not exceed 5MB"));
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setSelectedFile(file);
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      // 1️⃣ Update Basic Info (Name, Bio)
      const signupData = {
        company_name: formData?.company_name,
        short_bio: formData?.short_bio,
      };

      await dispatch(UpdateInSignupThunk(signupData)).unwrap();

      // 2️⃣ Update Profile Image (if changed)
      if (selectedFile) {
        const imageData = new FormData();
        imageData.append("profile_image", selectedFile);
        await dispatch(updateProfileImageThunk(imageData)).unwrap();
      }

      // 3️⃣ Fetch updated profile
      const data = await dispatch(getProfileThunk()).unwrap();
      const updatedUserData = data.provider || data;

      if (updatedUserData) {
        // 4️⃣ Sync localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        window.dispatchEvent(new Event("storage"));
      }

      toast.success(t("Changes saved successfully!") || "Changes saved successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err?.message || err || t("Failed to save changes") || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-[#E3E8EF] mb-8 bg-white rounded-[3px] shadow-xs"
    >
      <Header />

      <section className="p-6">
        {/* image*/}
        <div className="mb-4">
          <p className="text-[#4B5565] text-base font-normal">{t('Company logo')}</p>
          <div className="py-4 px-6 border border-[#EAECF0] mt-1.5 rounded-[3px] bg-slate-50/50">
            {!imagePreview && !userData?.image ? (
              <>
                <div className="w-full flex justify-center mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-30 h-30 border border-[#CDD5DF] rounded-full flex justify-center items-center bg-white shadow-xs cursor-pointer"
                  >
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={handleFileSelect}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleFileSelect();
                      }}
                    >
                      <img src="/images/Avatar Image.svg" alt="avatar" />
                    </span>
                  </motion.div>
                </div>
                <div className="w-full flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#FAF5EA' }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full sm:w-[50%] flex justify-center items-center gap-2 border border-[var(--color-primary)] text-[var(--color-primary)] font-medium py-2.5 px-4 rounded-[3px] cursor-pointer transition-all"
                    onClick={handleFileSelect}
                  >
                    <span>{t("Image selection")}</span>
                    <img src="/images/upload.svg" alt="upload" className="w-4 h-4" />
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={imagePreview || `${IMAGE_BASE_URL}/${userData?.image}`}
                  alt="Preview"
                  className="w-[112px] h-[112px] object-cover border border-[#EEF2F6] p-1 rounded-full cursor-pointer shadow-xs bg-white"
                />

                <div className="mt-3">
                  <motion.button
                    whileHover={{ scale: 1.03, filter: 'brightness(1.05)' }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="w-[150px] h-10 bg-[var(--color-primary)] text-white font-medium rounded-[3px] cursor-pointer shadow-xs transition-all"
                    onClick={handleFileSelect}
                  >
                    {t("replace")}
                  </motion.button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".webp,.png,.svg,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* company name */}
        <div>
          <p className="text-[#4B5565] text-base font-normal mb-1.5">{t('Company Name')}</p>
          <input 
            type="text"
            name="company_name"
            value={formData?.company_name}
            onChange={handleInputChange}
            placeholder={t('Enter the company name')}             
            className="h-14 p-3 w-full rounded-[3px] border border-[#E3E8EF] shadow-xs outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[var(--color-primary)] transition-colors" 
          />
        </div>

        {/* company description */}
        <div className="mt-4">
          <p className="text-[#4B5565] text-base font-normal mb-1.5">{t('Company Description')}</p>
          <textarea 
            name="short_bio"
            placeholder={t('Enter the company description')} 
            value={formData?.short_bio}  
            onChange={handleInputChange}           
            className="h-30 p-3 w-full rounded-[3px] border border-[#E3E8EF] shadow-xs outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[var(--color-primary)] transition-colors" 
          />
        </div>

        {/* btn */}
        <motion.button 
          whileHover={!isSaving ? { scale: 1.02, filter: 'brightness(1.05)' } : {}}
          whileTap={!isSaving ? { scale: 0.98 } : {}}
          disabled={isSaving}
          onClick={handleSaveChanges}
          className={`bg-[var(--color-primary)] h-15 w-full sm:w-62.5 text-white text-base font-medium rounded-[3px] mt-6 flex items-center justify-center gap-2 shadow-xs transition-all ${
            isSaving ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{t("Saving...")}</span>
            </>
          ) : (
            <span>{t('Save changes')}</span>
          )}
        </motion.button>
      </section>
    </motion.div>
  );
}

export default BasicInformationPage;

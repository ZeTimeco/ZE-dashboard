"use client";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { getmodulesThunk } from "@/redux/slice/Services/ServicesSlice";
import { setModuleIdThunk } from "@/redux/slice/Home/HomeSlice";
import { getProfileThunk } from "@/redux/slice/Setting/SettingSlice";
import { IMAGE_BASE_URL } from "../../../../config/imageUrl";

function ServiceToggle({ openServiceToggle, setOpenServiceToggle }) {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Redux state
  const { getmodules, loadingDetails } = useSelector((state) => state.services);

  // Controlled or uncontrolled open state
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = openServiceToggle !== undefined && setOpenServiceToggle !== undefined;
  const isOpen = isControlled ? openServiceToggle : internalOpen;
  const setIsOpen = isControlled ? setOpenServiceToggle : setInternalOpen;

  // Track switching loading state for specific item
  const [switchingId, setSwitchingId] = useState(null);

  // Active module key and selected service id
  const [currentModuleKey, setCurrentModuleKey] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  // Sync user data from localStorage
  const syncUserFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          setCurrentModuleKey(parsed?.current_module_key || null);
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
    }
  };

  useEffect(() => {
    syncUserFromLocalStorage();

    // Listen for user update events across the app
    const handleUserUpdated = () => {
      syncUserFromLocalStorage();
    };

    window.addEventListener("user_updated", handleUserUpdated);
    return () => window.removeEventListener("user_updated", handleUserUpdated);
  }, []);

  // Fetch modules if not loaded
  useEffect(() => {
    dispatch(getmodulesThunk());
  }, [dispatch]);

  // Pre-select matching module based on currentModuleKey
  useEffect(() => {
    if (getmodules?.length > 0 && currentModuleKey) {
      const matchingModule = getmodules.find(
        (service) => service.module_key === currentModuleKey
      );
      if (matchingModule) {
        setSelectedService(matchingModule.id);
      }
    }
  }, [getmodules, currentModuleKey]);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen]);

  // Current active service item
  const activeService =
    getmodules?.find((s) => s.id === selectedService) ||
    getmodules?.find((s) => s.module_key === currentModuleKey);

  const buttonLabel = activeService?.name || t("Switch activity");

  // Handle service switch
  const handleServiceClick = async (service) => {
    if (selectedService === service.id && !switchingId) {
      setIsOpen(false);
      return;
    }

    setSwitchingId(service.id);
    setSelectedService(service.id);

    try {
      // 1. Set the module ID on the server
      await dispatch(setModuleIdThunk(service.id)).unwrap();

      // 2. Fetch the latest profile data
      const profileData = await dispatch(getProfileThunk()).unwrap();
      const updatedUser = profileData?.provider;

      // 3. Update localStorage and notify the app
      if (updatedUser) {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("user_updated"));

        const { national_id, status, has_subscription } = updatedUser;
        const selectedModuleKey = updatedUser?.current_module_key;

        setIsOpen(false);

        // Check conditions and route accordingly
        if (national_id === null) {
          router.push("/Pages/dashboard/TemporaryDashboard/CompleteSignupData");
        } else if (status === "pending") {
          router.push("/Pages/dashboard/TemporaryDashboard/StatusOfProvider/waitingApproval");
        } else if (status === "rejected") {
          router.push("/Pages/dashboard/TemporaryDashboard/StatusOfProvider/RejectAccount");
        } else if (status === "active") {
          if (has_subscription === true) {
            if (selectedModuleKey === "food_delivery") {
              router.push("/Pages/requests/FoodDelivery_Module");
            } else {
              router.push("/Pages/Home");
            }
          } else {
            router.push("/Pages/dashboard/TemporaryDashboard/StatusOfProvider/AcceptAccount/");
          }
        }
      }
    } catch (error) {
      console.error("Error updating module or fetching profile:", error);
    } finally {
      setSwitchingId(null);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="h-10 px-3.5 flex items-center justify-between gap-2.5 bg-white border border-[var(--color-primary)] hover:bg-amber-50/40 rounded-[4px] cursor-pointer shadow-2xs transition-colors"
      >
        <span className="text-[var(--color-primary)] text-sm font-medium whitespace-nowrap">
          {buttonLabel}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.button>

      {/* Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-1.5 right-0 rtl:right-0 ltr:left-0 min-w-[220px] w-56 bg-white border border-[#EBECEF] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] z-50 overflow-hidden py-1"
          >
            {loadingDetails && (!getmodules || getmodules.length === 0) ? (
              <div className="p-4 flex items-center justify-center gap-2 text-slate-400 text-sm">
                <svg className="animate-spin h-4 w-4 text-[var(--color-primary)]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>{t("Loading...")}</span>
              </div>
            ) : getmodules && getmodules.length > 0 ? (
              <div className="flex flex-col">
                {getmodules.map((service) => {
                  const isSelected = selectedService === service.id;
                  const isSwitching = switchingId === service.id;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      disabled={isSwitching}
                      onClick={() => handleServiceClick(service)}
                      className={`
                        w-full flex items-center justify-between px-3.5 py-2.5 transition-colors cursor-pointer text-start
                        border-b border-[#F4F4F6] last:border-b-0
                        ${isSelected
                          ? "bg-[#FFF9EE] hover:bg-[#FFF4E0]"
                          : "bg-white hover:bg-slate-50"
                        }
                        ${isSwitching ? "opacity-70 cursor-wait" : ""}
                      `}
                    >
                      {/* Start: Icon + Service Name */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        {service?.image ? (
                          <img
                            src={`${IMAGE_BASE_URL}${service.image}`}
                            alt={service?.name || ""}
                            className="w-5 h-5 object-contain shrink-0"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded bg-slate-100 shrink-0" />
                        )}
                        <span
                          className={`text-sm truncate ${
                            isSelected
                              ? "text-[#1C252E] font-medium"
                              : "text-[#364152] font-normal"
                          }`}
                        >
                          {service?.name}
                        </span>
                      </div>

                      {/* End: Checkmark or Spinner */}
                      <div className="shrink-0 flex items-center justify-center w-5 h-5">
                        {isSwitching ? (
                          <svg className="animate-spin h-3.5 w-3.5 text-[var(--color-primary)]" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                        ) : isSelected ? (
                          <svg
                            className="w-4 h-4 text-[var(--color-primary)] stroke-[2.5]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 text-center text-slate-400 text-xs">
                {t("No services available")}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ServiceToggle;
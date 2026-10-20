"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

const RegistrationContext = createContext();

const defaultRegistrationData = {
  firstname: '',
  lastname: '',
  phone: '',
  country_code: '',
  role: '',
  password: '',
  password_confirmation: '',
  email: '',
  gender: ''
};

export const RegistrationProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState(defaultRegistrationData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('registrationData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setRegistrationData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error("Failed to parse registrationData from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage on change only after initial load
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('registrationData', JSON.stringify(registrationData));
      } catch (e) {
        console.error("Failed to save registrationData to localStorage:", e);
      }
    }
  }, [registrationData, isLoaded]);

  const updateRegistrationData = (newData) => {
    setRegistrationData((prev) => {
      const updated = { ...prev, ...newData };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('registrationData', JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to save updated registrationData:", e);
        }
      }
      return updated;
    });
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, updateRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

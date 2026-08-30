import React from 'react';
import { Dialog } from '@mui/material';
import { LocalizationProvider, MultiSectionDigitalClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTranslation } from 'react-i18next';

function TimeDialog({ open, setOpen, tempTime, setTempTime, confirmedTime, handleOkClick }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="bg-[#eef2f6] p-4 w-[320px]">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MultiSectionDigitalClock
            value={tempTime || confirmedTime}
            onChange={(newValue) => setTempTime(newValue)}
            ampm={false}
            timeSteps={{ minutes: 15 }}
            sx={{
              width: "100%",
              "& .MuiMultiSectionDigitalClock-root": { width: "100%" },
              "& .MuiMultiSectionDigitalClockSection-root": { flex: 1 },
            }}
          />
        </LocalizationProvider>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleOkClick}
            className="bg-[var(--color-primary)] text-white px-4 py-1 rounded-[3px] cursor-pointer"
          >
            {t("Add")}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default TimeDialog;
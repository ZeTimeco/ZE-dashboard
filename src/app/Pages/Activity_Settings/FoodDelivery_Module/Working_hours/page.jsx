'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Content, { DAYS_OF_WEEK, parseTimeToDayjs, getTimeFormatted } from './Content'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { EditWorkingHoursConfigThunk, getWorkingHoursConfigThunk } from '@/redux/slice/Setting/SettingSlice'
import { toast } from 'react-toastify'

function Working_hoursPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getWorkingHoursConfig, loading } = useSelector((state) => state.setting)

  const [schedule, setSchedule] = useState(() =>
    DAYS_OF_WEEK.map((day) => ({
      id: day.id,
      dayKey: day.key,
      isEnabled: true,
      periods: [{ id: `${day.id}-0`, from: null, to: null }],
    }))
  );

  useEffect(() => {
    dispatch(getWorkingHoursConfigThunk())
  }, [dispatch])

  useEffect(() => {
    if (getWorkingHoursConfig) {
      const apiDays = getWorkingHoursConfig?.data || (Array.isArray(getWorkingHoursConfig) ? getWorkingHoursConfig : null);
      if (apiDays && Array.isArray(apiDays)) {
        const newSchedule = DAYS_OF_WEEK.map((day) => {
          const apiDay = apiDays.find(
            (item) =>
              item.day_en?.toLowerCase() === day.id ||
              item.day_en?.toLowerCase() === day.key.toLowerCase() ||
              item.day?.toLowerCase() === day.key.toLowerCase()
          );

          if (!apiDay) {
            return {
              id: day.id,
              dayKey: day.key,
              isEnabled: false,
              periods: [{ id: `${day.id}-0`, from: null, to: null }],
            };
          }

          const isEnabled = Boolean(apiDay.is_open);
          const slots = Array.isArray(apiDay.slots) ? apiDay.slots : [];
          const periods = slots.map((slot, idx) => ({
            id: slot.id || `${day.id}-${idx}-${Date.now()}`,
            from: parseTimeToDayjs(slot.from),
            to: parseTimeToDayjs(slot.to),
          }));

          return {
            id: day.id,
            dayKey: day.key,
            isEnabled,
            periods: periods.length > 0 ? periods : [{ id: `${day.id}-0`, from: null, to: null }],
          };
        });

        setSchedule(newSchedule);
      }
    }
  }, [getWorkingHoursConfig])

  const handleSubmit = async () => {
    // Validate enabled days before submitting
    for (const day of schedule) {
      if (day.isEnabled) {
        const hasEmpty = day.periods.some((p) => !p.from || !p.to);
        if (hasEmpty) {
          toast.error(t('Please complete the current working period first'));
          return;
        }

        const periodStrings = day.periods.map(
          (p) => `${getTimeFormatted(p.from)}-${getTimeFormatted(p.to)}`
        );
        const hasDuplicates = new Set(periodStrings).size !== periodStrings.length;
        if (hasDuplicates) {
          toast.error(t('This working period is already added for this day'));
          return;
        }

        const hasSameTime = day.periods.some(
          (p) => getTimeFormatted(p.from) && getTimeFormatted(p.to) && getTimeFormatted(p.from) === getTimeFormatted(p.to)
        );
        if (hasSameTime) {
          toast.warning(t('Start time cannot be equal to end time'));
          return;
        }
      }
    }

    // Build payload matching APIdog POST structure
    const payload = {
      schedule: schedule.map((day) => ({
        day: day.dayKey,
        is_open: day.isEnabled,
        slots: day.isEnabled
          ? day.periods
              .filter((p) => p.from && p.to)
              .map((p) => ({
                from: getTimeFormatted(p.from),
                to: getTimeFormatted(p.to),
              }))
          : [],
      })),
    };

    try {
      await dispatch(EditWorkingHoursConfigThunk(payload)).unwrap();
      toast.success(t('Working hours saved successfully'));
      dispatch(getWorkingHoursConfigThunk());
    } catch (err) {
      toast.error(err?.message || err?.error || t('Failed to save working hours'));
    }
  };

  return (
    <>
      <div className='border border-[#E3E8EF] rounded-3px mb-4'>
        <div>
          <Header />
        </div>

        <div className='p-6 flex flex-col gap-4'>
          <Content schedule={schedule} setSchedule={setSchedule} />

          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`w-[25%] h-14 rounded-3px text-white transition font-medium
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 cursor-pointer"
              }`}
          >
            {loading ? t("Saving...") : t("Save changes")}
          </button>
        </div>
      </div>
    </>
  )
}

export default Working_hoursPage
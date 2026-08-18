import React from 'react'
import GeneralAssessments from './GeneralAssessments'
import LowRatingAlerts from './LowRatingAlerts'
import ReplyingToReviews from './ReplyingToReviews'
import { useTranslation } from 'react-i18next'

function RatingSettingPage() {
  const loading = false
  const {t} = useTranslation()
  
  return (
    <>
      <GeneralAssessments/>
      <LowRatingAlerts/>
      <ReplyingToReviews/>

      <button
        disabled={loading}
        className={`w-[25%] h-14 rounded-3px text-white transition
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary cursor-pointer"
          }`}
      >
        {loading ? t("Saving...") : t("Save changes")}
      </button>
    </>
  )
}

export default RatingSettingPage
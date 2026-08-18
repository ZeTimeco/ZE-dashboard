import React from 'react'
import GeneralAssessments from './GeneralAssessments'
import LowRatingAlerts from './LowRatingAlerts'
import ReplyingToReviews from './ReplyingToReviews'

function RatingSettingPage() {
  return (
    <>
      <GeneralAssessments/>
      <LowRatingAlerts/>
      <ReplyingToReviews/>
    </>
  )
}

export default RatingSettingPage
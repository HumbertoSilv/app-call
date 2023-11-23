import { useState } from 'react'
import CalendarStep from './CalendarStep'
import ConfirmStep from './ConfirmStep'

const ScheduleForm = () => {
  const [selectDateTime, setSelectDateTime] = useState<Date | null>()

  const handleClearSelectedDateTime = () => {
    setSelectDateTime(null)
  }

  if (selectDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectDateTime}
        onCancelConfirmation={handleClearSelectedDateTime}
      />
    )
  }

  return <CalendarStep onSelectDateTime={setSelectDateTime} />
}

export default ScheduleForm

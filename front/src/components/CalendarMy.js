import Calendar from 'react-calendar'

const CalendarMy = ({ date, setDate, disabledDates }) => {
  console.log(date)
  console.log(disabledDates)
  return (
    <div>
      <div className="calendar_wrapper">
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
          tileDisabled={({ date, view }) =>
            (view === 'month') && // Block day tiles only
                    disabledDates.some(disabledDate =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                    )}
        />
      </div>

      {date.length > 0 ? (
        <p>
          <span>Start:</span>
          {date[0].toDateString()}
     &nbsp;
     &nbsp;
          <span>End:</span>{date[1].toDateString()}
        </p>
      ) : (
        <p>
          <span>Default selected date:</span>{date.toDateString()}
        </p>
      )
      }

    </div>
  )
}

export default CalendarMy
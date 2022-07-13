import Calendar from 'react-calendar'

const CalendarMy = ({ date, setDate }) => {


  return (
    <div>
      <div className="calendar_wrapper">
        <Calendar onChange={setDate} value={date} selectRange={true} />
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
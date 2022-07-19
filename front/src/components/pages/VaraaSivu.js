/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import CalendarMy from '../CalendarMy'
import { useState, useEffect } from 'react'
import '../styles/varaaSivu.css'
import rent from '../../services/rent'
import Message from '../Message'
import Select from 'react-select'

const VaraaSivu = () => {

  const [Name, setName] = useState('')
  const [Address, setAddress] = useState('')
  const [Number, setNumber] = useState('')
  const [date, setDate] = useState(new Date())
  const [email, setEmail] = useState('')
  const [lisatieto, setLisatieto] = useState('')
  const [guests, setGuests] = useState(0)
  const [bookedDates, setBookedDates] = useState([])
  const [emessage, setMessage] = useState('')


  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleTietoChange = (event) => {
    setLisatieto(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  useEffect(() => {

    function getDates(startDate, endDate) {
      const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
      const end = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0))

   const date = new Date(start.getTime())

   const dates = []

   while (date <= end) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
   }

   return dates
  }
    const data = rent.getAll()
      .then(res => {
        const booked = res.map(booking => [booking.startDate, booking.endDate])
        const kaikkiPaivat = booked.map(staend => getDates(staend[0], staend[1]))
        setBookedDates([].concat.apply([], kaikkiPaivat))
      })
      console.log(`valmis lista: ${bookedDates}`)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const varausObj = {
      name: Name,
      number: Number,
      address: Address,
      email: email,
      lisatieto: lisatieto,
      guests: guests,
      startDate: date[0],
      endDate: date[1],
    }

    rent.
      create(varausObj)
      .then(savedRent => {
        setBookedDates(bookedDates.concat(savedRent))
        setMessage('Varaus vastaanotettu!. Sähköpostissa varausvahvistus.')
        console.log('varaus tehty')
    setTimeout(() => {
      setMessage(null)
    }, 150000)
      })
      .catch(error => {
        console.log(error.response.data)
        setMessage(JSON.stringify(error.response.data.error))
      setTimeout(() => {
        setMessage(null)
      },10000)
    })


  }
  const options = [
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
              { value: 5, label: '5' },
              { value: 6, label: '6' }
  ]

  return (
    <div className='varaasivu'>
      <div className='varaa_form'>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input
              value={Name}
              onChange={handleNameChange}/>
          </div>
          <div>
            Number: <input
              value={Number}
              onChange={handleNumberChange}/>
          </div>
          <div>
            Address: <input
              value={Address}
              onChange={handleAddressChange}/>
          </div>
          <div>
            Email: <input
              value={email}
              onChange={handleEmailChange}/>
          </div>
          <div>
            <label> Majoittuvien henkilöiden määrä:</label>
            <Select
            className='react-select'
            isClearable={false}
            name='guests'
            id='guests'
            options={options}
            onChange={(choice) => setGuests(parseInt(choice.value) || console.log(choice))}>
            </Select>
          </div>
          <div className='lisatieto-wrapper'>
            <p className='lisatieto-header'>Lisätietoja:</p>
            <textarea
              value={lisatieto}
              className='lisatieto-kentta'
              onChange={handleTietoChange}
              rows={5}
              cols={5}
            />
          </div>
          <div>
        <button type='submit'>Vahvista varaus</button>
      </div>
        </form>
      </div>
      <Message message={emessage} />
      <CalendarMy date={date} setDate={setDate} disabledDates={bookedDates} />
    </div>
  )
}

export default VaraaSivu
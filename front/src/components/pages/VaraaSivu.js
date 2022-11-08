/* eslint-disable no-unused-vars */
import CalendarMy from '../CalendarMy'
import { useState, useEffect } from 'react'
import '../styles/varaaSivu.css'
import rent from '../../services/rent'
import Message from '../Message'
import Select from 'react-select'
import Hinnoittelu from '../Hinnoittelu'
import Navbar from '../Navbar'

/* This page is returned when making request to /varaasivu */
const VaraaSivu = () => {

  const [Name, setName] = useState('')
  const [Address, setAddress] = useState('')
  const [Number, setNumber] = useState('')
  const [date, setDate] = useState(new Date())
  const [email, setEmail] = useState('')
  const [lisatietoja, setLisatieto] = useState('')
  const [guests, setGuests] = useState(0)
  const [bookedDates, setBookedDates] = useState([])
  const [emessage, setMessage] = useState('')
  const [price, setPrice] = useState(0)

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

  /* This useEffect requests data from mongo server, and parses it for the frontend to use
   Now this function sets booked dates in setDate */
  useEffect(() => {
    const getDates = (startDate, endDate) => {
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
        const booked = res.map(booking => [booking.startDate , booking.endDate])
        const kaikkiPaivat = booked.map(staend => getDates(staend[0], staend[1]))
        setBookedDates([].concat.apply([], kaikkiPaivat))
      })

  }, [])

  /**
 * Handles form submit (renting the cottage)
 *
  */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (window.confirm(`Haluatko varata päivät ${date[0].getDate()}.${date[0].getMonth()} - ${date[1].getDate()}.${date[0].getMonth()}`)) {
      const varausObj = {
        name: Name,
        number: Number,
        address: Address,
        email: email,
        lisatietoja: lisatietoja,
        guests: guests,
        startDate: date[0].setHours(4),
        endDate: date[1].setHours(4),
        price: price
      }
      console.log(varausObj)
      rent.
        create(varausObj)
        .then(savedRent => {
          setMessage('Varaus vastaanotettu!. Sähköpostissa varausvahvistus.')
          setTimeout(() => {
            setMessage(null)
          }, 150000)
        })
        .catch(error => {
          setMessage(JSON.stringify(error.response.data.error))
          setTimeout(() => {
            setMessage(null)
          },10000)
        })

    }
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
    <div className='vaasivu_wrap'>
      <Navbar />
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
              <p className='lisatieto-header'>Kirjoita tähän kenttään ainakin kellonaika milloin saavut, ja mahdollisesti muita lisätietoja.</p>
              <textarea
                value={lisatietoja}
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
        <Hinnoittelu date={date} price={price} setPrice={setPrice} />
      </div>
    </div>
  )
}

export default VaraaSivu
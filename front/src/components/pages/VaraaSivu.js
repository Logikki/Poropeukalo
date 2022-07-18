/* eslint-disable indent */
import CalendarMy from '../CalendarMy'
import { useState } from 'react'
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
  const [varatutPaivat, setVaratutPaivat] = useState([])
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
        setVaratutPaivat(varatutPaivat.concat(savedRent))
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
      <CalendarMy date={date} setDate={setDate} />
    </div>
  )
}

export default VaraaSivu
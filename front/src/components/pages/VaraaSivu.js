import CalendarMy from '../CalendarMy'
import { useState } from 'react'
import '../styles/varaaSivu.css'
import rent from '../../services/rent'
import Message from '../Message'

const VaraaSivu = () => {
  const [Name, setName] = useState('')
  const [Address, setAddress] = useState('')
  const [Number, setNumber] = useState('')
  const [date, setDate] = useState(new Date())
  const [email, setEmail] = useState('')
  const [lisatieto, setLisatieto] = useState('')
  const [guests, setGuests] = useState(0)
  const [varatutPaivat, setVaratutPaivat] = useState([])
  const [message, setMessage] = useState('')

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
      name: { Name },
      number: { Number },
      address: { Address },
      email: { email },
      lisatieto: { lisatieto },
      guests: { guests }
    }
    rent.
      create(varausObj)
      .then(savedRent => {
        setVaratutPaivat(varatutPaivat.concat(savedRent))
      })
    setMessage('Varaus vastaanotettu!. Sähköpostissa varausvahvistus.')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


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
            <select name='guests' id='guests' onChange={(choice) => setGuests(parseInt(choice))}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
            </select>
          </div>
          <div>
            <label>Lisätietoja : </label>
            <textarea
              value={lisatieto}
              onChange={handleTietoChange}
              rows={5}
              cols={5}
            />
          </div>
        </form>
      </div>
      <CalendarMy date={date} setDate={setDate} />
      <div>
        <button type='submit'>Vahvista varaus</button>
      </div>
      <Message message={message} />
    </div>
  )
}

export default VaraaSivu
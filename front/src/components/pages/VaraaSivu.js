import CalendarMy from '../CalendarMy'
import { useState } from 'react'
import '../styles/varaaSivu.css'

const VaraaSivu = () => {
  const [Name, setName] = useState('')
  const [Address, setAddress] = useState('')
  const [Number, setNumber] = useState('')
  const [date, setDate] = useState(new Date())

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  const handleSubmit = () => {
    return
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
            <label> Majoittuvien henkilöiden määrä:</label>
            <select name='guests' id='guests'>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
            </select>
          </div>
        </form>
      </div>
      <CalendarMy date={date} setDate={setDate} />
      <div>
        <button type='submit'>Vahvista varaus</button>
      </div>
    </div>
  )
}

export default VaraaSivu
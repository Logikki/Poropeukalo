import TietoKentta from './TietoKentta'
import Slider from './Slider'
import './styles/cards.css'

const Cards = () => {

  return (
    <div className='cards'>
      <div className='cards__container'>
        <h1 className="kortit__otsikko">Mökki luoston ytimessä</h1>
        <div className='cards__wrapper'>
          <TietoKentta />
          <Slider />
        </div>
      </div>
    </div>
  )
}

export default Cards
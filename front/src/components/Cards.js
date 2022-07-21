import Card from './Card'
import './styles/cards.css'
import FooterHome from './FooterHome'

const Cards = () => {

  const importAll =(r) => {
    let images = {}
    r.keys().map((item) =>  images[item.replace('./', '')] = r(item))
    return images
  }

  // eslint-disable-next-line no-undef
  const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/))


  return (
    <div className='cards'>
      <div className='cards__container'>
        <h1 className="kortit__otsikko">Mökki luoston ytimessä</h1>
        <div className='cards__wrapper'>
          <FooterHome />
          <Card
            src={images['img-14.jpeg']}
            // text='Rentoudu takan äärellä'
            label='Olohuone'
            path='/Mokki'
          />
          <Card
            src={images['img-19.jpeg']}
            // text='Keittiössä kaikki tarvittava ruoanlaittoon.'
            label='Keittiö'
            path='/Mokki'
          />


          <Card
            src={images['img-18.jpeg']}
            // text='Olohuoneessa levitettävä sohva'
            label='Olohuone'
            path='/Mokki'
          />
          <Card
            src={images['img-4.jpeg']}
            // text='Toisessa makuuhuoneessa kerrossänky'
            label='Makuuhuone'
            path='/Mokki'
          />

          <Card
            src={images['img-2.jpeg']}
            // text='Makuuhuoneessa parisänky'
            label='Makuuhuone'
            path='/Mokki'
          />
          <Card
            src={images['img-10.jpeg']}
            // text='Mökissä on sähkösauna'
            label='Sauna'
            path='/Mokki'
          />
          <Card
            src={images['img-13.jpeg']}
            // text='Yläkerrassa parisänky ja tilaa nukkua'
            label='Yläkerta'
            path='/Mokki'
          />
          <Card
            src={images['img-1.jpeg']}
            // text='Porot tulevat usein lähelle.'
            label='Poroja'
            path='/Mokki'
          />

        </div>
      </div>
    </div>
  )
}

export default Cards
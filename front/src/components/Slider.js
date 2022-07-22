import { useState, useEffect } from 'react'
import Card from './Card'

const Slider = () => {
  const [index, setIndex] = useState(0)
  const [images, setImages] = useState([])
  const [size, setSize] = useState(0) // images length

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const r = require.context('../images', false, /\.(png|jpe?g|svg)$/)
    let i = {}
    r.keys().map((item) =>  i[item.replace('./', '')] = r(item))
    setImages(i)
    //keskeneräinen
    // const size = Object.keys(images).length
    // setSize(size)
    setSize(14)
  },[])

  const handleRightClick = () => {
    {index >= size-1 ? (
      setIndex(0)
    ) : (
      setIndex(index + 1)
    )
    }
  }

  const handleLeftClick = () => {
    {index === 0 ? (
      setIndex(size -1)
    ) : (
      setIndex(index - 1)
    )
    }
  }

  return (
    <div className='slider_wrapper'>

      <div className='buttons_container'>
        <div className='sliderStyles'>
          <div>
            <div className='leftArrowStyles' onClick={handleLeftClick} >
          ❰
            </div>
            <Card
              src={images[`img-${index}.jpeg`]}
              // text='Porot tulevat usein lähelle.'
              label='Poroja'
              path='/Mokki'
            />
            <div className='rightArrowStyles' onClick={handleRightClick} >
          ❱
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
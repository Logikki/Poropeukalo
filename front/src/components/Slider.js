import { useState, useEffect } from 'react'
import Card from './Card'

const Slider = () => {
  const [index, setIndex] = useState(0)
  const [images, setImages] = useState([])
  const [size, setSize] = useState(0) // images length
  // eslint-disable-next-line no-unused-vars
  const [windowSize, setWindowSize] = useState(0)
  const [reg, setReg] = useState('img-')

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  /**
 * checks windowsize when window is resized
 * set regex so webpage knows whether to render small or fullsize images
 */
  useEffect(() => {

    function handleWindowResize() {
      const wSize = getWindowSize()
      setWindowSize(wSize)
      console.log(getWindowSize())

      if (wSize.innerWidth < 475) {
        console.log('alle 475')
        setReg('img-verysmall')
      } else if (wSize.innerWidth < 620 && wSize.innerWidth > 475) {
        setReg('img-sm')
      } else {
        setReg('img-')
      }
    }

    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const r = require.context('../images', false, /\.(png|jpe?g|svg)$/)
    let i = {}
    r.keys().map((item) =>  i[item.replace('./', '')] = r(item))
    setImages(i)
    //keskeneräinen
    // const size = Object.keys(images).length
    // setSize(size)
    setSize(13)
  },[])

  const handleRightClick = () => {
    console.log(`${reg}${index}.jpeg`)
    {index >= size-1 ? (
      setIndex(0)
    ) : (
      setIndex(index + 1)
    )
    }
  }

  const handleLeftClick = () => {
    `${reg}${index}.jpeg`
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
              src={images[`${reg}${index}.jpeg`]}
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
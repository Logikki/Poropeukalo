
/**
 * returns div that tells price for the rented days
 * is also responsible for changing the pricing with setPrice()
 * @param {first renting date} startDate
 * @param {last rented date} endDate
 */
const Hinnoittelu = ( { date, price, setPrice } ) => {
  if (!date.length > 0) {
    return null
  }
  else {
    const startDate = date[0]
    const endDate = date[1]
    /**
   *
   * @param {first renting date} startDate
   * @param {last rented date} endDate
   * @returns List of days in the middle as well as the start -and end date
   */
    const getDates = () => {
      const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
      const end = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0))

      const date = new Date(start.getTime())

      const dates = []

      while (date <= end) {
        dates.push(new Date(date))
        date.setDate(date.getDate() + 1)
      }
      console.log('dates' + dates)
      return dates
    }

    /**
   * This function calculates the price to book these specific dates.
   * Price depends on the month and length of the stay.
   * @param {List of days that are rented} days
   * @returns How much it costs to rent these specific dates
   */
    const pricing = (days) => {
      let sesonkiKerroin = 0
      //tarkistetaan, kuuluuko päivä sesonkikuukauteen
      {[0,1,2,10,11].includes(days[0].getMonth()) ? (
        sesonkiKerroin = 1.8
      ) : (
        sesonkiKerroin = 1
      )}
      setPrice((days.length-1)*60*sesonkiKerroin)
    }
    pricing(getDates())

    console.log(price)
    return (
      <div>Vuokrauksen hinta: {price}€</div>
    )
  }
}

export default Hinnoittelu


const Card = (src) => {

  return (
    <>
      <img className="mokkikuva" src={src.src} alt="" label={src.label} />
      <p>{src.text}</p>
    </>
  )
}

export default Card
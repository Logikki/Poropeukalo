const Card = (src) => {

  return (
    <div className="kuva_item">
      <img className="mokkikuva" src={src.src} alt="" label={src.label} />
      <p>{src.text}</p>
    </div>
  )
}

export default Card
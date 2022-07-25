import { Link } from 'react-router-dom'
import './styles/navbar.css'

const navbar = () => {
  return (
    <>
      <div className="navbarWrap">
        <div className='navList'>
          <Link to="/" className="navItem">
          Koti
          </Link>
          <Link to='/varaasivu' className="navItem">
            <>Vuokraa</>
          </Link>
        </div>
      </div>
    </>
  )
}

export default navbar
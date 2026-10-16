import './header.scss'
import Logo from '../../components/logo/Logo'
import Search from '../../components/search/Search'
import Navbar from '../../components/navbar/Navbar'

function Header() {
  return (
    <div className='header fixed-top d-flex align-items-center' id='header'>
        <Logo/>
        <Search/>
        <Navbar/>
    </div>
  )
}

export default Header
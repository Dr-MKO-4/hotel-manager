import './logo.scss'
import { Link } from 'react-router-dom'

function Logo() {
  const handleToggleSidebar=()=>{
    document.body.classList.toogle('toggle-sidebar');
  };  
  return (
    <div className='d-flex align-items-center justify-content-between'>
        <Link className='logo d-flex align-items-center' style={{textDecoration:'none'}} to={'/'}>
            <span className='d-none d-lg-block'>NERADash</span>
        </Link>
        <i className='bi bi-list toggle-sidebar-btn' onClick={handleToggleSidebar}></i>
    </div>
   
  )
}

export default Logo

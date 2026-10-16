import "./navbar.scss"
import { Link } from "react-router-dom"
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined"
import Navavatar from "./Navavatar"

const navbar = () => {
  return (
    <nav className='header-nav ms-auto'>
      <ul className="d-flex align-items-center">
        <li className="nav-item dropdown">
          <Link className="nav-link nav-icon" to={"/"} data-bs-toggle='dropdown'>
            <i className="bi bi-bell"></i>
            <span className="badge bg-primary badge-number">4</span>
          </Link>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            <li className="dropdown-header">
              Vous avez 4 notifications
              <Link to={'/'}>
                <span className="badge rounded-pill bg-primary p-2 ms-2">Voir toutes les notifications</span>
              </Link>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li className="notification-item">
              <i className="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>hjkjh</h4>
                <p>sfgfsgdfg</p>
                <p>rjgydfhgth</p>
              </div>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li className="notification-item">
              <i className="bi bi-x-circle text-danger"></i>
              <div>
                <h4>hjkjh</h4>
                <p>sfgfsgdfg</p>
                <p>rjgydfhgth</p>
              </div>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li className="notification-item">
              <i className="bi bi-check-circle text-success"></i>
              <div>
                <h4>hjkjh</h4>
                <p>sfgfsgdfg</p>
                <p>rjgydfhgth</p>
              </div>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li className="notification-item">
              <i className="bi bi-info-circle text-primary"></i>
              <div>
                <h4>hjkjh</h4>
                <p>sfgfsgdfg</p>
                <p>rjgydfhgth</p>
              </div>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li className="dropdown-footer">
              <Link className="a" style={{textDecoration:'none',aligntext:'center'}}>Voir toutes les notifications</Link>
            </li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link nav-icon" to={"/"} data-bs-toggle='dropdown'>
            <i className="bi bi-chat-left-text"></i>
            <span className="badge bg-success badge-number">4</span>
          </Link>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            <li className="dropdown-header">
              Vous avez 3 messages
              <Link to={'/'}>
                <span className="badge rounded-pill bg-primary p-2 ms-2">Voir tous les messages</span>
              </Link>
            </li>
            <li><hr className="dropdown-divider"/></li>
            
            <li><hr className="dropdown-divider"/></li>
            <li className="message-item">
                <Link style={{textDecoration:'none'}}>
                  <PersonOutlineOutlined className="rounded-circle"/>
                </Link>
                <div>
                  <h4>John SNOW</h4>
                  <p>nnnnnnnfdnndf</p>
                  <p>4 hrs. ago</p>
                </div>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li className="message-item">
                <Link style={{textDecoration:'none'}}>
                  <PersonOutlineOutlined className="rounded-circle"/>
                </Link>
                <div>
                  <h4>John SNOW</h4>
                  <p>nnnnnnnfdnndf</p>
                  <p>4 hrs. ago</p>
                </div>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li className="message-item">
                <Link style={{textDecoration:'none'}}>
                  <PersonOutlineOutlined className="rounded-circle"/>
                </Link>
                <div>
                  <h4>John SNOW</h4>
                  <p>nnnnnnnfdnndf</p>
                  <p>4 hrs. ago</p>
                </div>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li className="dropdown-footer">
              <Link className="a" style={{textDecoration:'none',aligntext:'center'}}>Voir toutes les notifications</Link>
            </li>
          </ul>
        </li>
        <Navavatar/>
      </ul>
    </nav>
  )
}

export default navbar
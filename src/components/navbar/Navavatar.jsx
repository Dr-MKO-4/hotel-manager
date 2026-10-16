import React from 'react'
import './navbar.scss'
import profileImg from '../../components/images/avatar-admin.svg'
import { Link } from "react-router-dom"
function Navavatar() {
  return (
    <li className="nav-item dropdown pe-3">
          <Link className="nav-link nav-profile d-flex align-items-center pe-0" style={{textDecoration:'none'}} to={"/"} >
            <img src={profileImg} alt="profile" className="rounded-circle" />
            <span className="d-none d-md-block dropdown-toggle ps-2">F.David</span>
          </Link>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li className="dropdown-header">
              <h6>David</h6>
              <span>Web Developer</span>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li>
                <Link style={{textDecoration:'none'}} className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-person"></i>
                  <span>My profile</span>
                </Link>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li>
                <Link style={{textDecoration:'none'}} className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-gear"></i>
                  <span>Account Settigs</span>
                </Link>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li>
                <Link style={{textDecoration:'none'}} className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-question-circle"></i>
                  <span>Need Help?</span>
                </Link>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li>
                <Link style={{textDecoration:'none'}} className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </Link>
            </li>
          </ul>
        </li>
  )
}

export default Navavatar
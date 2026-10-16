import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import StoreIcon from "@mui/icons-material/Store"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import InsertChartIcon from "@mui/icons-material/InsertChart"
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined"
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyAltOutlined"
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'

import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className='sidebar'>

        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to='/' style={{textDecoration:'none'}}>
                    <li>
                            <DashboardIcon className="icon"/>
                        <span>Dashboard</span>
                    </li>
                </Link>
                <p className="title">LISTES</p>
                <Link to="/users" style={{textDecoration:'none'}}>
                    <li>
                        <PersonOutlineOutlinedIcon className="icon"/>
                        <span>Users</span>
                    </li>
                </Link>
                <Link to="/products" style={{textDecoration:'none'}}>
                    <li>
                        <StoreIcon className="icon"/>
                        <span>Produits</span>
                    </li>
                </Link>
                <li>
                    <CreditCardIcon className="icon"/>
                    <span>Commandes</span>
                </li>
                <li>
                    <LocalShippingIcon className="icon"/>
                    <span>Livraison</span>
                </li>
                <p className="title">ANALYSES</p>
                <li>
                    <InsertChartIcon className="icon"/>
                    <span>Gestion stock</span>
                </li>
                <p className="title">SERVICE</p>
                <li>
                    <SettingsSystemDaydreamOutlinedIcon className="icon"/>
                    <span>System Health</span>
                </li>
                <li>
                    <PsychologyOutlinedIcon className="icon"/>
                    <span>Logs</span>
                </li>
                <li>
                    <SettingsApplicationsIcon className="icon"/>
                    <span>Parametres</span>
                </li>
                <p className="title">UTILISATEUR</p>
                <li>
                    <AccountCircleOutlinedIcon className="icon"/>
                    <span>Profile</span>
                </li>
                <li>
                    <ExitToAppIcon className="icon"/>
                    <span>Se deconnecter</span>
                </li>
                
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOptions">
                <LightModeOutlinedIcon style={{color:'#e6c241'}}/>
                
            </div>
            <div className="colorOptions">
                <DarkModeOutlinedIcon className="icon" style={{color:'black'}}/>
            </div>
        </div>
        <div className="bottom1">
            
        </div>
    </div>
  )
}

export default Sidebar
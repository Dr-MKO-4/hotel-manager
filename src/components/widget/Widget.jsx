import "./widget.scss"
import { API_URL } from '../../config';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined"
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined"
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined"
import {Link} from "react-router-dom"
import axios from "axios"
import { useEffect,useState } from "react"
const Widget = ({type}) => {
    let data;
    const diff = 20;
    const [nombreUtilisateurs, setNombreUtilisateurs] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/nombre-utilisateurs`)
      .then(reponse => {
        setNombreUtilisateurs(reponse.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
    switch (type) {
        case "user":
            data={
                title:"USERS",
                isMoney:nombreUtilisateurs,
                link:<Link to='/users' style={{textDecoration:'none'}}>See all users</Link>,
                icon:<Link to='/users'>
                        <PersonOutlinedIcon className="icon" style={{color:"crimson",backgroundColor:"rgba(255,0,0,0.2)"}}/>
                    </Link>,
            };
            break;
        case "order":
            data={
                title:"ORDERS",
                isMoney:10,
                link:"View all order",
                icon:<ShoppingCartOutlinedIcon className="icon" style={{color:"goldenrod",backgroundColor:"rgba(218,165,32,0.2)"}}/>
            }
            break;
        case "earning":
            data={
                title:"EARNINGS",
                isMoney:500,
                link:"View net earning",
                icon:<MonetizationOnOutlinedIcon className="icon" style={{color:"green",backgroundColor:"rgba(0,128,0,0.2)"}}/>
            }
            break;
        case "balance":
            data={
                title:"BALANCE",
                isMoney:75,
                link:"See details",
                icon:<AccountBalanceWalletOutlinedIcon className="icon" style={{color:"purple",backgroundColor:"rgba(128,0,128,0.2)"}}/>
            }
            break;
        default:
            break;
    }
  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney } </span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpIcon className="icon"/>
                {diff}%
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget;
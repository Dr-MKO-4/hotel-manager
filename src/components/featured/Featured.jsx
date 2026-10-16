import "./featured.scss"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowupIcon from "@mui/icons-material/KeyboardArrowUp"
import {CircularProgressbar} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const Featured = () => {
  return (
    <div className="featured">
        <div className="top">
            <h1 className="title">Revenue Total</h1>
            <MoreVertIcon fontSize="small"/>
        </div>
        <div className="bottom">
          <div className="featuredChart">
            <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
          </div>
          <p className="title">vente totale d'aujourd'hui</p>
          <p className="amount">400f</p>
          <p className="desc">Previous transactions processing.Last payments may not be inclued.</p>
          <div className="summary">
            <div className="item">
              <div className="itemtitle">Target</div>
              <div className="itemResult negative">
                <KeyboardArrowDownIcon fontSize="small"/>
                <div className="resultAmount">12.0k F</div>
              </div>
            </div>
            <div className="item">
              <div className="itemtitle">Last Week</div>
              <div className="itemResult negative">
                <KeyboardArrowupIcon fontSize="small"/>
                <div className="resultAmount">12.7k F</div>
              </div>
            </div>
            <div className="item">
              <div className="itemtitle">Last Month</div>
              <div className="itemResult positive">
                <KeyboardArrowDownIcon fontSize="small"/>
                <div className="resultAmount">14k F</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Featured
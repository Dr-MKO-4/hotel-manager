import Sidebar from "../../components/sidebar/Sidebar"
import "./Single.scss"
import Chart from "../../components/chart/Chart"
import List from "../../components/table/TABLE"
import Header from "../../components/header/Header"
const Single = () => {
  return (
    <div className="single">
      <Sidebar/>
      <div className="singleContainer">
        <Header/>
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src="/demo/img/client-jn.svg" alt="" className="itemImg"/>
              <div className="detail">
                <h1 className="itemtitre">Julie Ndongo</h1>
                <div className="detailItem">
                  <span className="itemkey">Email:</span>
                  <span className="itemvalue">julie.ndongo@exemple.org</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Phone:</span>
                  <span className="itemvalue">6XX XXX XXX</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Adress:</span>
                  <span className="itemvalue">Kenedy</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Country:</span>
                  <span className="itemvalue">Cameroun</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title="User Spending(last 6 months)"/>
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>

      </div>
    </div>
  )
}

export default Single
import './home.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget"
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/TABLE'
import Header from '../../components/header/Header';

const Home = () => {
  return (
    <div className='home'>
      <Header/>
      <Sidebar/>
      <div className="homeContainer">
        
        <div className="widgets">
          <Widget type="user"/>
          <Widget type="order"/>
          <Widget type = "earning"/>
          <Widget type="balance"/>
        </div>
        <div className="charts">
          <Featured/>
          <Chart title="Last 6 months (revenue) " aspect={2/1}/>
        </div>
        <div className="listcontainer">
          <div className="listTitle">Derniers Transactions</div>
          <Table/>
        </div>
      </div>
    </div>
  )
}

export default Home
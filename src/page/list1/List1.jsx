import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Datatable1 from "../../components/datatable1/Datatable1"
import Header from "../../components/header/Header"

const list = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listcontainer">
        <Header/>
        <Datatable1/>
      </div>
    </div>
  )
}

export default list
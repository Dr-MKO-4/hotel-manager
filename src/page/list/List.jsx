import "./List.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Datatable from "../../components/datatable/Datatable"
import Header from "../../components/header/Header"

const list = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listcontainer">
        <Header/>
        <Datatable/>
      </div>
    </div>
  )
}

export default list
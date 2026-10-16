import "./datatable.scss"
import { API_URL } from '../../config';
import DeleteIcon from '@mui/icons-material/Delete'
import {DataGrid}  from "@mui/x-data-grid"
import { userColumns} from "../../datatablesource"
import { useEffect,useState } from "react"
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from "react-router-dom"
const Datatable = () => {
  const [data,setData]=useState([])
  useEffect(()=>{
    axios.get(`${API_URL}/utilisateurs`).then(reponse=>{
      setData(reponse.data)
    })
    .catch(error=>{
      console.error('erreur lors de la connexion a la base de donnee')
    })
  })
  const supprimer=(id)=>{
    axios.delete(`${API_URL}/utilisateurs/${id}`).then(()=>{
      setData(data.filter(item=>item.id !== id))
    })
    .catch(error=>{
      console.log('erreur lors de la suppression des donnees')
    })
  }
  const actionColumn=[{field:'Action',hearderName:'Action',width:200,renderCell:(params) => {
    return(
      <div className="cellAction">
        <Link to="/users/test" style={{textDecoration:'none'}}><div className="viewButton">view</div></Link>
        <Link to={'/'} className="editbutton"><EditIcon/></Link>
        <div className="deleteButton">
          <button onClick={()=>supprimer(params.row.id)}>
              <DeleteIcon className="button"/>
          </button>
        </div>
      </div>
    )
  }}]
  return (
    <div className="datatable">
      <div className="datatabletitle">
        Add New User
        <Link to='/users/new' state={{textDecoration:'none'}} className="link"><AddIcon/> Add New</Link>
      </div>
      <DataGrid className="datagrid" rows={data} columns={userColumns.concat(actionColumn)} disableRowSelectionOnClick pageSizeOptions={[10, 25,100]}  autoHeight checkboxSelection/>
    </div>
  )
}

export default Datatable
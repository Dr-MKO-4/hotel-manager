import "./datatable1.scss"
import { API_URL } from '../../config';
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState,useEffect } from "react"
import axios from "axios"
import Edit from "@mui/icons-material/Edit"
import {DataGrid}  from "@mui/x-data-grid"
import { productColumns} from "../../datatablesource"
import { Link } from "react-router-dom"
const Datatable = () => {
  const [data,setData]=useState([])
  useEffect(()=>{
    axios.get(`${API_URL}/produits/`).then(reponse=>{
      setData(reponse.data)
    })
    .catch(err=>{
      console.error(err)
    })
  })
  const supprimer=(id)=>{
    axios.delete(`${API_URL}/produits/${id}`).then(()=>{
      setData(data.filter(item=>item.id !== id))
    })
    .catch(err=>{
      console.error(err)
    })
  }
  const actionColumn=[{field:'Action',hearderName:'Action',width:180,renderCell:(params) => {
    return(
      <div className="cellAction">
        <Link to="/Products/test" style={{textDecoration:'none'}}><div className="viewButton">View</div></Link>
        <Link to={'/'} style={{textDecoration:'none'}}><Edit/></Link>
        <div className="deleteButton">
          <button onClick={()=>{
            supprimer(params.row.id)
          }}>
           <DeleteIcon/>
          </button>
        </div>
      </div>
    )
  }}]
  return (
    <div className="datatable">
      <div className="datatabletitle">
        Add New Products
        <Link to='/products/new' state={{textDecoration:'none'}} className="link"> 
          <AddIcon/>
          Add New 
        </Link>
      </div>
      <DataGrid className="datagrid" rows={data} columns={productColumns.concat(actionColumn)} disableRowSelectionOnClick pageSizeOptions={[5,10,25]} autoHeight  checkboxSelection/>
    </div>
  )
}

export default Datatable
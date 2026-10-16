import Sidebar from "../../components/sidebar/Sidebar"
import { API_URL } from '../../config';
import "./New.scss"
import axios from "axios"
import DriveFolderUpOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useState } from "react"
import Header from "../../components/header/Header"
const New = ({inputs,title}) => {
  const [produit, setProduit] = useState('');
  const [prix, setPrix] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [description,setDescription] = useState('')

  const soumettreFormulaire = async () => {
    try{
      await fetch(`${API_URL}/produits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ produit, prix,category,stock,description }),
    });
    setProduit('');
    setPrix('');
    setCategory('')
    setDescription('')
    setStock('')
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit :', error);
  }
};

  const [file,setFile]=useState(null)
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      await axios.post(`${API_URL}/produits/`, formData); // Envoyez l'image au serveur
      console.log('Image téléversée avec succès !');
    } catch (error) {
      console.error('Erreur lors du téléversement de l\'image :', error);
    }
  };
  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Header/>
        <div className="top">
          <h1 className="title">{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file):"/demo/img/no-image.svg"} alt="" />
          </div>
          <div className="right">
            <form >
            <div className="formInput">
                <label htmlFor="file">Image:<DriveFolderUpOutlinedIcon className="icon"/> <button onClick={handleUpload} ></button></label>
                <input type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:'none'}}/>
                
              </div>
              
                <div className="formInput">
                  <label htmlFor="">Nom Produit</label>
                  <input type="text" placeholder='Apple Macbook Pro' value={produit} onChange={(e) => setProduit(e.target.value)} />
                </div>
                <div className="formInput">
                  <label htmlFor="">Description</label>
                  <input type="mail" placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className="formInput">
                  <label htmlFor="">Prix</label>
                  <input type="text" placeholder='430k' value={prix} onChange={(e)=>setPrix(e.target.value)}/>
                </div>
                <div className="formInput">
                  <label htmlFor="">Category</label>
                  <input type="text" placeholder='Computers' value={category} onChange={(e)=>setCategory(e.target.value)} />
                </div>
                <div className="formInput">
                  <label htmlFor="">Quantite</label>
                  <input type="text" value={stock} onChange={(e)=>setStock(e.target.value)} placeholder='20' />
                </div>
              <button className="button" onClick={soumettreFormulaire}> Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New
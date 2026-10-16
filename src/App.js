import Home from "./page/home/Home";
import Login from "./page/login/Login";
import New from "./page/new/New";
import List from "./page/list/List";
import Single from "./page/single/Single";
import List1 from "./page/list1/List1"
import './style/dark.scss'
import React,{useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'
import{
  BrowserRouter,
  Routes,
  Route,
}from "react-router-dom";
import { productInputs } from "./formSource";
import { userInputs } from "./formSource";
function App() {
  useEffect(()=>{
    fetch('')
  })
  return (
    <div className='app'>

      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>}/>
            <Route path = "Login" element = {<Login/>}/>
            <Route path="Users">
              <Route index element={<List/>}/>
              <Route path=":userID" element = {<Single/>}/>
              <Route path='New' element= {<New inputs={userInputs} title="Add new User"/>}/>
            </Route>
          </Route>
          <Route path="products">
            <Route index element={<List1/>}/>
            <Route path=":productID" element= {<Single/>}/>
            <Route path="New" element={<New inputs={productInputs} title="Add new Products"/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




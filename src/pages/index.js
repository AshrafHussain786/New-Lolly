import React from "react";
import Header from "../components/Header";
import Lolly from '../components/lolly';
import { navigate } from "gatsby";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <div className="listLollies">
        <div>
            <Lolly top="red" middle="yellow" bottom="green" /> 
        </div> 
        <div>
            <Lolly top="#d52358" middle="#e95946" bottom="#deaa43" />          
        </div> 
        <div>
            <Lolly top="red" middle="yellow" bottom="green" /> 
        </div>  
      </div>
 
      <button onClick={() => navigate("/CreateNew")}> Create New Lolly </button>
      {/* <br/>
      <button onClick={() => navigate("/template/lollyPage")}> Template Lolly </button> */}
    </div>
  )
}
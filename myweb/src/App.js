import React, { Component } from 'react';

import './App.css';
import axios from 'axios';

class Corp extends Component {
    render(){
  return (
    <div className={this.props.ha}>
      <ul>
        
        
            {this.props.materii.map(mat => (
              <li key={mat.toString()}>{mat}</li>
            ))}
        </ul>
      </div>
    );
  }
}



class App extends Component {
  
      schimba(x){
      if(x==1 && this.state.Panelhome!=="arata"){
      this.setState({"Panelhome":"arata"});
      this.setState({"PanelMaterii":"ascunde"});
      this.setState({"PanelObiecte":"ascunde"});
      }
      else if(x==2 && this.state.PanelMaterii!=="arata"){
      this.setState({"Panelhome":"ascunde"});
      this.setState({"PanelMaterii":"arata"});
      this.setState({"PanelObiecte":"ascunde"});
      }
      else if(x==3 && this.state.PanelObiecte!=="arata"){
      this.setState({"Panelhome":"ascunde"});
      this.setState({"PanelMaterii":"ascunde"});
      this.setState({"PanelObiecte":"arata"});
      }
  }
  
  categoriJson(x) {
    let me = 'https://tech-web-project-mini11223.c9users.io/categories';
    
    axios.get(me).then((results) => {
         var temp= results.data;
         var n=temp.length;
         let mat=[];
         this.setState({"data":temp});
         console.log(mat);
         for(var i=0;i<n;i++){
         mat.push(temp[i].numeCategorie)
         }
        this.setState({"materii":mat});
        this.schimba(x)
        
    }).catch((error) => {
      console.log("er")
    })

  };
  
  Afisare
  
  constructor() {
    super();
    
   
   
    this.state = {
      Panelhome: "arata",
      PanelMaterii:"ascunde",
      PanelObiecte:"ascunde",
      nume:"",
      data:[],
      materii:[]
    }
    
  }
  
  
  render(){
  
  return (
      <div>
        <header className="App-header">
          
          <h1 className="header1" >E-learning</h1>
            <div className="tab-panels">
            <ul className="tabs">
                <li  className={this.state.Panelhome} onClick={() => this.schimba(1)} >Home</li>
                <li className={this.state.PanelMaterii} onClick={() => this.categoriJson(2)}>Materii</li>
                <li className={this.state.PanelObiecte} >Obiecte</li>
            </ul>
            </div>
       
        </header>
        <p className={this.state.Panelhome}>a</p>
         <p className={this.state.Panelhome}>a</p>
        <Corp ha={this.state.PanelMaterii} materii={this.state.materii}/>
        <p>{this.state.nume}</p>
        </div>
      
    );
  }
}

export default App;

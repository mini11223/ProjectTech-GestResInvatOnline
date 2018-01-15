import React, { Component } from 'react';

import './App.css';
import './fb.js';
import axios from 'axios';




class Materii extends Component {
    render(){
  return (
    <div className={this.props.ha}>
      <ul>
        
        
            {this.props.materii.map(mat => (
              <li>Id:{mat.id} Categorie:{mat.numeCategorie}</li>
            ))}
        </ul>
      </div>
    );
  }
}

class Obiecte extends Component {
  
  
  
  
    render(){
  return (
    <div className={this.props.ha}>
      <ul>
            {this.props.obiecte.map(obj => (
              <li> Id: {obj.id} , Obiect: {obj.numeMaterie}</li>
            ))}
        </ul>
      </div>
    );
  }
}

class AddMaterie extends Component {
  constructor() {
    super();
    
   this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    
  }
  
  
  reMaterie (nume)  {
    let url = 'https://tech-web-project-mini11223.c9users.io/categories';
    var tempMaterie='{"numeCategorie": "'+ nume + '"}';
    axios.post(url, {
    numeCategorie: nume
  }).then((results) => {
    this.setState({value:''})
     console.log(tempMaterie);
    }).catch(error => {
      console.log(error)
    })
  }
  
 
  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value)
  }
  
  
    render(){
  return (
    <div className={this.props.ha}>
    <form>
    <br></br>
  Categorie: <input type="text" value={this.state.value} onChange={this.handleChange}></input><br></br>
 <button className="asezare" type="button" onClick={() => this.reMaterie(this.state.value)}></button>
    </form>
    
      </div>
    );
  }
}

class DeleteObiecte extends Component{
  
  
  constructor() {
    super();
    
   this.state = {
    value: '',
    obj:[],
    data:[],
    x:1
   };
  
  

    
      setInterval(() => this.obiecteJson(),1000);
  
    this.handleChange = this.handleChange.bind(this);
    
  }
  
  
  
   obiecteJson() {
    let me = 'https://tech-web-project-mini11223.c9users.io/objects';
    
   axios.get(me).then((results) => {
         var temp= results.data;
         var n=temp.length;
         let obs=[];
         for(var i=0;i<n;i++){
         obs.push({id:temp[i].id,numeMaterie:temp[i].numeMaterie})
         }
        this.setState({"obj":obs});
    }).catch((error) => {
      console.log("er")
    })

  };
  
 
  
  
  delObj(){
    
    for(var i=0;i<this.state.obj.length;i++)
      if(this.state.obj[i].numeMaterie===this.state.value){
        var tempId=this.state.obj[i].id;
      }
   let url = 'https://tech-web-project-mini11223.c9users.io/objects/'+tempId;
    axios.delete(url).then((results) => {
     
    this.setState({value:""});
     
    }).catch(error => {
      console.log(error)
    })
  }
  
  
  handleChange(event) {
    this.setState({value: event.target.innerHTML});
    
  }
  
  
render(){
  return (
    
    <div className={this.props.ha}>
      <ul>
            {this.state.obj.map(ob => (
              <li onClick={this.handleChange}>{ob.numeMaterie}</li>
            ))}
        </ul>
        <p>Element selectat: {this.state.value}</p>
        <button className="asezare" type="button" onClick={() => this.delObj()}>Sterge</button>
      </div>
    );
  }
}

class DeleteCategorie extends Component{
  
  
  constructor() {
    super();
    
   this.state = {
    value: '',
    materii:[],
    x:1
   };
  
  
  let me = 'https://tech-web-project-mini11223.c9users.io/objects';
    
   axios.get(me).then((results) => {
         var temp= results.data;
         var n=temp.length;
         let obs=[];
         this.setState({"data":temp});
         
         for(var i=0;i<n;i++){
         obs.push({id:temp[i].id,numeMaterie:temp[i].numeMaterie})
         }
         this.setState({"obj":[]});
        this.setState({"obj":obs});
        console.log("am fost aici")
        
    }).catch((error) => {
      console.log("er")
    })
    
      setInterval(() => this.categorieJson(),1000);
  
    this.handleChange = this.handleChange.bind(this);
    
  }
  
  
  
   categorieJson() {
    let me = 'https://tech-web-project-mini11223.c9users.io/categories';
    
    axios.get(me).then((results) => {
         var temp= results.data;
         var n=temp.length;
         let mat=[];
         console.log(mat);
         for(var i=0;i<n;i++){
         mat.push({id:temp[i].id,numeCategorie:temp[i].numeCategorie})
         }
        this.setState({"materii":mat});
       
        
    }).catch((error) => {
      console.log("er")
    })

  };
  
 
  
  
  delMat(){
    
    for(var i=0;i<this.state.materii.length;i++)
      if(this.state.materii[i].numeCategorie===this.state.value){
        var tempId=this.state.materii[i].id;
      }
   let url = 'https://tech-web-project-mini11223.c9users.io/categories/'+tempId;
    axios.delete(url).then((results) => {
     
    this.setState({value:""});
     
    }).catch(error => {
      console.log(error)
    })
  }
  
  
  handleChange(event) {
    this.setState({value: event.target.innerHTML});
    
  }
  
  
render(){
  return (
    
    <div className={this.props.ha}>
      <ul>
            {this.state.materii.map(ob => (
              <li onClick={this.handleChange}>{ob.numeCategorie}</li>
            ))}
        </ul>
        <p>Element selectat: {this.state.value}</p>
        <button className="asezare" type="button" onClick={() => this.delMat()}>Sterge</button>
      </div>
    );
  }
}



class AddObiecte extends Component {
  constructor() {
    super();
    
   this.state = {value1: '',
     value2:''
   };
  
    this.handleChange1 = this.handleChange1.bind(this);
     this.handleChange2 = this.handleChange2.bind(this);
  }
  
  
  reObiect (nume,id)  {
    let url = 'https://tech-web-project-mini11223.c9users.io/objects';
    axios.post(url, {
    numeMaterie: nume,
    idCategorie:id
  }).then((results) => {
    this.setState({value1:""})
    this.setState({value2:""})
    }).catch(error => {
      console.log(error)
    })
  }
 
  
  handleChange1(event) {
    this.setState({value1: event.target.value});
   
  }
  handleChange2(event) {
    this.setState({value2: event.target.value});
  }
  
  
    render(){
  return (
    <div className={this.props.ha}>
    <form>
    <br></br>
  Obiect:<input type="text" value={this.state.value1} onChange={this.handleChange1}></input><br></br>
  Id Categorie:<input type="text" value={this.state.value2} onChange={this.handleChange2}></input><br></br>
 <button className="asezare" type="button" onClick={() => this.reObiect(this.state.value1,this.state.value2)}></button>
    </form>
    
      </div>
    );
  }
}


class App extends Component {
  
      schimba(x){
      if(x===1 && this.state.Panelhome!=="arata"){
      this.setState({"Panelhome":"arata"});
      this.setState({"PanelMaterii":"ascunde"});
      this.setState({"PanelObiecte":"ascunde"});
      this.setState({"PanelAddMaterie":"ascunde"});
      this.setState({"PanelAddObiecte":"ascunde"});
      this.setState({"PanelDelCategorie":"ascunde"});
      this.setState({"PanelDelObiecte":"ascunde"});
      }
      else if(x===2 && this.state.PanelMaterii!=="arata"){
      this.setState({"Panelhome":"ascunde"});
      this.setState({"PanelMaterii":"arata"});
      this.setState({"PanelObiecte":"ascunde"});
      this.setState({"PanelAddMaterie":"ascunde"});
      this.setState({"PanelAddObiecte":"ascunde"});
      this.setState({"PanelDelCategorie":"ascunde"});
      this.setState({"PanelDelObiecte":"ascunde"});
      }
      else if(x===3 && this.state.PanelObiecte!=="arata"){
      this.setState({"Panelhome":"ascunde"});
      this.setState({"PanelMaterii":"ascunde"});
      this.setState({"PanelObiecte":"arata"});
      this.setState({"PanelAddMaterie":"ascunde"});
      this.setState({"PanelAddObiecte":"ascunde"});
      this.setState({"PanelDelCategorie":"ascunde"});
      this.setState({"PanelDelObiecte":"ascunde"});
      }
       else if(x===4 && this.state.PanelAddMaterie!=="arata"){
      this.setState({"Panelhome":"ascunde"});
      this.setState({"PanelMaterii":"ascunde"});
      this.setState({"PanelObiecte":"ascunde"});
      this.setState({"PanelAddMaterie":"arata"});
      this.setState({"PanelAddObiecte":"ascunde"});
      this.setState({"PanelDelCategorie":"ascunde"});
      this.setState({"PanelDelObiecte":"ascunde"});
      }
        else if(x===5 && this.state.PanelAddObiecte!=="arata"){
      this.setState({"Panelhome":"ascunde"});
      this.setState({"PanelMaterii":"ascunde"});
      this.setState({"PanelObiecte":"ascunde"});
      this.setState({"PanelAddMaterie":"ascunde"});
      this.setState({"PanelAddObiecte":"arata"});
      this.setState({"PanelDelCategorie":"ascunde"});
      this.setState({"PanelDelObiecte":"ascunde"});
      
      }
        else if(x===6 && this.state.PanelDelCategorie!=="arata"){
      this.setState({"Panelhome":"ascunde"});
      this.setState({"PanelMaterii":"ascunde"});
      this.setState({"PanelObiecte":"ascunde"});
      this.setState({"PanelAddMaterie":"ascunde"});
      this.setState({"PanelAddObiecte":"ascunde"});
      this.setState({"PanelDelCategorie":"arata"});
      this.setState({"PanelDelObiecte":"ascunde"});
      }
      else if(x===7 && this.state.PanelDelObiecte!=="arata"){
      this.setState({"Panelhome":"ascunde"});
      this.setState({"PanelMaterii":"ascunde"});
      this.setState({"PanelObiecte":"ascunde"});
      this.setState({"PanelAddMaterie":"ascunde"});
      this.setState({"PanelAddObiecte":"ascunde"});
      this.setState({"PanelDelCategorie":"ascunde"});
      this.setState({"PanelDelObiecte":"arata"});
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
         mat.push({id:temp[i].id,numeCategorie:temp[i].numeCategorie})
         }
        this.setState({"materii":mat});
        this.schimba(x)
        
    }).catch((error) => {
      console.log("er")
    })

  };
  
  obiecteJson(x) {
    let me = 'https://tech-web-project-mini11223.c9users.io/objects';
    
    axios.get(me).then((results) => {
         var temp= results.data;
         var n=temp.length;
         let obj=[];
         this.setState({"data":temp});
         console.log(obj);
         for(var i=0;i<n;i++){
         obj.push({id:temp[i].id,numeMaterie:temp[i].numeMaterie})
         }
        this.setState({"obiecte":obj});
        this.schimba(x)
        
    }).catch((error) => {
      console.log("er")
    })

  };
  
  
  constructor() {
    super();
    
   

   
    this.state = {
      Panelhome: "arata",
      PanelMaterii:"ascunde",
      PanelObiecte:"ascunde",
      PanelAddMaterie:"ascunde",
      PanelAddObiecte:"ascunde",
      PanelDelCategorie:"ascunde",
      PanelDelObiecte:"ascunde",
      nume:"",
      data:[],
      materii:[],
      obiecte:[]
    }
    
  }
  
  
  render(){
 
 
  return (
    /*eslint-disable */
      <div>
        <header className="App-header">
          
          <h1 className="header1" >E-learning</h1>
            <div className="tab-panels">
            <ul className="tabs">
                <li onClick={() => this.schimba(1)} >Home</li>
                <li onClick={() => this.categoriJson(2)}>Categorii</li>
                <li onClick={() => this.obiecteJson(3)}>Obiecte</li>
                <li onClick={() => this.schimba(4)}>re categorie</li>
                <li onClick={() => this.schimba(5)}>re obiect</li>
                <li onClick={() => this.schimba(6)}>Stergere categorie</li>
                <li onClick={() => this.schimba(7)}>Stergere obiect</li>
               
                <div class="fb-share-button" data-href="http://tech-web-project-mini11223.c9users.io:8081/" data-layout="button" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ftech-web-project-mini11223.c9users.io%3A8081%2F&amp;src=sdkpreparse">Distribuie</a></div>{ /* eslint-disable-next-line*/}
               
            </ul>
            </div>
       
        </header>
        <div className={this.state.Panelhome }>
        <h1 className="header2">Bun venit in biblioteca noastra! </h1>
        </div>
        <Materii ha={this.state.PanelMaterii} materii={this.state.materii}/>
        <Obiecte ha={this.state.PanelObiecte} obiecte={this.state.obiecte}/>
        <AddMaterie ha={this.state.PanelAddMaterie} />
        <AddObiecte ha={this.state.PanelAddObiecte} />
        <DeleteCategorie ha={this.state.PanelDelCategorie} />
        <DeleteObiecte ha={this.state.PanelDelObiecte} />
      

        </div>
      
    );
  }
}

export default App;

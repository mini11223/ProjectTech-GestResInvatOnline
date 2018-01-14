import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Header extends Component {
  

  
  render(){
  return (
      
        <header className="App-header">
          
          <h1 className="header1" >E-learning</h1>
            <div className="tab-panels">
            <ul className="tabs">
                <li rel="panel1" className="active" >Home</li>
                <li rel="panel2" >Materii</li>
                <li rel="panel3" >Obiecte</li>
            </ul>
            </div>
       
        </header>
        
      
    );
  }
}

class Corp extends Component {
    render(){
  return (
      <p className={this.props.ha}>"ana"</p>
    );
  }
}



class App extends Component {
  
     schimba(){
       if(this.state.arata==="ascunde")
      this.setState({"arata":"arata"});
     else this.setState({"arata":"ascunde"});
     console.log(this.state.arata)
  }
  
  
  
  constructor() {
    super();
   
    this.state = {
      arata: "arata"
      
    }
    
  }
  
   getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);
    console.log(ud);
}


  
  luareJson(){
   
    
  }
  
  
  
  render(){
  
  return (
      <div>
        <header className="App-header">
          
          <h1 className="header1" >E-learning</h1>
            <div className="tab-panels">
            <ul className="tabs">
                <li rel="panel1" className="active" onClick={() => this.schimba()} >Home</li>
                <li rel="panel2" onClick={() => this.getJSONP('https://tech-web-project-mini11223.c9users.io/materials', function(data){
    console.log(data);
})}>Materii</li>
                <li rel="panel3" >Obiecte</li>
            </ul>
            </div>
       
        </header>
        <p className={this.state.arata}>a</p>
        <Corp ha={this.state.arata}/>
        
        </div>
      
    );
  }
}

export default App;

import React from 'react';
import './App.css';
//import Container from 'react-bootstrap/Container'
function App() {
  return (
    <div
    style={{
      
      backgroundImage: `url('/Designer.png')`,
      backgroundSize: 'cover',        // Ensures the image covers the entire screen
      backgroundPosition: 'center',   // Centers the image
      backgroundRepeat: 'no-repeat',  // Prevents repeating
      height: '100vh',                // Sets the height to the full viewport
      width: '100vw',  
      display: 'flex',               // Makes the container a flexbox
        justifyContent: 'center',      // Centers the box horizontally
        alignItems: 'center', 
    
    }}
  >
    <div  style={{
      display:'flex',
       flexDirection:'column',
       alignItems:'center' ,
       justifyContent:'center',
        backgroundColor:'white', 
        width:300, margin:20, 
        border:20 , borderRadius:5,
         borderWidth:2, borderColor:'black',
         borderStyle:'solid',
         backgroundImage:'("/Designer.png")'
         }}>
        <h1 style={{color:'red',margin:10,  padding:5}}>KYC at tips</h1>
        <div  style={{display:'flex', alignItems:'center' ,alignContent:'center'}}>
          <button style={{margin:10, width:100, height:50, background:'red', color:'white', borderRadius:5, fontWeight:'bold '}}>Signup</button>
          <button style={{margin:10, width:100, height:50, background:'red', color:'white', borderRadius:5, fontWeight:'bold '}}>Login</button>
        </div>
    </div>
</div>

  );
}

export default App;

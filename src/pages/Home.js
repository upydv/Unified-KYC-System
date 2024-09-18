import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import { redirect } from 'react-router-dom';

function Home() {
  const [showSignup, setSignup] = useState(false);
  const [showLogin, setLogin] = useState(false);

  const handleSignup = () => setSignup(true);   // Explicitly set to true to show the modal
  const handleCloseSignup = () => setSignup(false);

  const handleLogin = () => setLogin(true);     // Explicitly set to true to show the modal
  const handleCloseLogin = () => setLogin(false);

  return (
    <div
      style={{
        backgroundImage: `url('/Designer.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          width: 300,
          margin: 20,
          border: 20,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: 'black',
          borderStyle: 'solid',
        }}
      >
        <h1 style={{ color: 'red', margin: 10, padding: 5 }}>KYC at tips</h1>
        <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
          <Button
            onClick={handleSignup}
            style={{
              margin: 10,
              width: 100,
              height: 50,
              background: 'red',
              color: 'white',
              borderRadius: 5,
              fontWeight: 'bold',
            }}
          >
            Sign Up
          </Button>
          <Button
            onClick={handleLogin}
            style={{
              margin: 10,
              width: 100,
              height: 50,
              background: 'red',
              color: 'white',
              borderRadius: 5,
              fontWeight: 'bold',
            }}
          >
            Login
          </Button>
        </div>
      </div>

      {/* Modal for Sign Up */}
      <Modal show={showSignup} onHide={handleCloseSignup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Signup />
        </Modal.Body>
        {/* <Modal.Footer style={{backgroundColor:'red'}}>
          <Button variant="secondary" onClick={handleCloseSignup}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* Modal for Login */}
      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default Home;

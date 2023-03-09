import './App.css';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Alert from './Components/Alert';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login showAlert={showAlert} />} />
            <Route path='/register' element={<Register showAlert={showAlert} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
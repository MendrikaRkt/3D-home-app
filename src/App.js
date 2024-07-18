import React, { useState, useEffect } from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import Home3D from './components/Home3D';
import DeviceControl from './components/DeviceControl';
import Login from './components/Login';
import Register from './components/Register';
import { SocketProvider } from './contexts/SocketContext';
import { getDevices } from './services/deviceService';
import DeviceList from './components/DeviceList';
import DeviceScene from './components/DeviceScene';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [user, setUser] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    if (user) {
      fetchDevices();
    }
  }, [user]);

  const fetchDevices = async () => {
    try {
      const fetchedDevices = await getDevices();
      setDevices(fetchedDevices);
    } catch (error) {
      console.error('Failed to fetch devices', error);
    }
  };

  return (
    <AuthProvider>
    <SocketProvider>
    <Router>
        <div className="App">
          <Routes>
            <Route exact path="/">
              {user ? (
                <>
                  <Home3D />
                  {devices.map(device => (
                    <DeviceControl key={device._id} device={device} />
                  ))}
                </>
              ) : (
                <Login setUser={setUser} />
              )}
            </Route>
            <Route path="/register" component={Register} />
          </Routes>
        </div>
      
       <div>
      <DeviceList />
      <DeviceScene />
    </div>
    </Router>
    </SocketProvider>
    </AuthProvider>
  );
}

export default App;
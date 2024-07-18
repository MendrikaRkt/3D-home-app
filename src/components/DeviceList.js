// components/DeviceList.js
import React, { useState, useEffect, useCallback } from 'react';
import { getDevices, fetchDevices, addDevice, updateDevice, deleteDevice } from '../services/deviceService';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ name: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const socket = useSocket();
  const { user } = useAuth();
  const history = useNavigate();


  const loadDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDevices();
      setDevices(data);
    } catch (err) {
      console.error('Failed to load devices:', error);
    }
  };

  const handleAddDevice = async (e) => {
    e.preventDefault();
    try {
      await addDevice(newDevice);
      setNewDevice({ name: '', type: '' });
      loadDevices();
    } catch (error) {
      console.error('Failed to add device:', error);
    }
  };

  const handleUpdateDevice = async (id, updatedData) => {
    try {
      await updateDevice(id, updatedData);
      loadDevices();
    } catch (error) {
      console.error('Failed to update device:', error);
    }
  };

  const handleDeleteDevice = async (id) => {
    try {
      await deleteDevice(id);
      loadDevices();
    } catch (error) {
      console.error('Failed to delete device:', error);
    }
  };

  useEffect(() => {
    if (user) {
      loadDevices();
    } else {
      history.push('/login');
    }
  }, [user, history, loadDevices]);

  return (
    <div>
      <h2>Devices</h2>
      <form onSubmit={handleAddDevice}>
        <input
          type="text"
          value={newDevice.name}
          onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
          placeholder="Device Name"
        />
        <input
          type="text"
          value={newDevice.type}
          onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
          placeholder="Device Type"
        />
        <button type="submit">Add Device</button>
      </form>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name} - {device.type}
            <button onClick={() => handleUpdateDevice(device.id, { ...device, name: device.name + ' (updated)' })}>
              Update
            </button>
            <button onClick={() => handleDeleteDevice(device.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceList;
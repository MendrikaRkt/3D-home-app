import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';

export default function DeviceControl({ device }) {
  const socket = useSocket();

  const handleToggle = () => {
    const newState = !device.state;
    socket.emit('deviceStateChange', { id: device._id, state: newState });
  };

  return (
    <div>
      <Typography variant="h6">{device.name}</Typography>
      <Route checked={device.state} onChange={handleToggle} />
      <Button onClick={() => console.log('Additional action')}>
        More Actions
      </Button>
    </div>
  );
}
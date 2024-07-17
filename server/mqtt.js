const mqtt = require('mqtt');
const Device = require('./models/Device');

const client = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('home/devices/#');
});

client.on('message', async (topic, message) => {
    const [, , deviceId, action] = topic.split('/');
    const payload = JSON.parse(message.toString());
  
    try {
      const device = await Device.findById(deviceId);
      if (!device) {
        console.error(`Device not found: ${deviceId}`);
        return;
      }
  
      switch (action) {
        case 'state':
          device.state = payload.state;
          break;
        // Add more cases for different actions
      }
  
      await device.save();
      io.emit('deviceUpdate', device);
    } catch (error) {
      console.error('Error processing MQTT message:', error);
    }
  });
  
  module.exports = client;
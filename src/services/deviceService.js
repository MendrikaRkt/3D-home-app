// src/services/deviceService.js
import axios from 'axios';
import { authHeader } from './authService';

const API_URL = process.env.AUTH_API_DEVICES_URL;

export const getDevices = async () => {
    try {
      const response = await axios.get(API_URL, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error getting devices:', error);
      throw error;
    }
  };

export const fetchDevices = async () => {
  try {
    const response = await axios.get(API_URL, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
};

export const addDevice = async (deviceData) => {
  try {
    const response = await axios.post(API_URL, deviceData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error adding device:', error);
    throw error;
  }
};

export const updateDevice = async (deviceId, deviceData) => {
  try {
    const response = await axios.put(`${API_URL}/${deviceId}`, deviceData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error updating device:', error);
    throw error;
  }
};

export const deleteDevice = async (deviceId) => {
  try {
    await axios.delete(`${API_URL}/${deviceId}`, { headers: authHeader() });
  } catch (error) {
    console.error('Error deleting device:', error);
    throw error;
  }
};
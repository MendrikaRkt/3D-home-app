// components/DeviceScene.js
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { fetchDevices } from '../services/deviceService';

const DeviceScene = () => {
  const mountRef = useRef(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const loadDevices = async () => {
      const data = await fetchDevices();
      setDevices(data);
    };
    loadDevices();
  }, []);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create 3D representations of devices
    devices.forEach((device, index) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = index * 2 - (devices.length - 1);
      scene.add(cube);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [devices]);

  return <div ref={mountRef}></div>;
};

export default DeviceScene;
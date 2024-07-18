import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function House(props) {
  const { nodes, materials } = useGLTF('/house.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.House.geometry} material={materials.HouseMaterial} />
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </>
  )
}

export default function Home3D() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <Lights />
      <House position={[0, -1, 0]} scale={[0.1, 0.1, 0.1]} />
      <OrbitControls />
    </Canvas>
  )
}
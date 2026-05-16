import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Environment, Sphere, TorusKnot, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function AnimatedShapes() {
  const torusRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.1
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <TorusKnot args={[1.1, 0.35, 128, 32]} position={[0, 0, 0]} ref={torusRef as any}>
          <MeshDistortMaterial 
            color="#22d3ee" // cyan-400
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.3}
            speed={2}
          />
        </TorusKnot>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[0.5, 32, 32]} position={[-2, 1.5, -1]}>
          <meshStandardMaterial color="#2dd4bf" metalness={0.6} roughness={0.2} />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[0.3, 32, 32]} position={[2, -1.5, 1]}>
          <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.1} />
        </Sphere>
      </Float>
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-[400px] lg:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#2dd4bf" />
        <spotLight position={[0, 5, 0]} intensity={0.8} penumbra={1} color="#22d3ee" />
        <Environment preset="city" />
        
        <group scale={0.85}>
          <AnimatedShapes />
        </group>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={1} 
        />
      </Canvas>
    </div>
  )
}

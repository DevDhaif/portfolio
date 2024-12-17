'use client'

import { Canvas } from '@react-three/fiber'
import Particles from './Particles'

export default function Scene() {
    return (
        <Canvas
            className="fixed inset-0 -z-10"
            camera={{ position: [0, 0, 50], fov: 75 }}
        >
            <ambientLight intensity={0.5} />
            <Particles />
        </Canvas>
    )
}
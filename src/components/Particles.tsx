'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Points as ThreePoints } from 'three'

const Particles = ({ count = 5000 }) => {
    const points = useRef<ThreePoints>(null)

    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 50
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }

    useFrame(({ clock }) => {
        if (points.current) {
            points.current.rotation.x = clock.getElapsedTime() * 0.1
            points.current.rotation.y = clock.getElapsedTime() * 0.1
        }
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                sizeAttenuation
                color="#88c0d0"
                transparent
                opacity={0.8}
            />
        </points>
    )
}

export default Particles
'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from '@react-three/drei'
import { Points as ThreePoints } from 'three'

const Particles = ({ count = 5000 }) => {
    // Properly type the ref
    const points = useRef<ThreePoints>(null)

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50
        }
        return pos
    }, [count])

    useFrame(({ clock }) => {
        if (points.current) {
            points.current.rotation.x = clock.getElapsedTime() * 0.1
            points.current.rotation.y = clock.getElapsedTime() * 0.1
        }
    })

    return (
        <Points ref={points}>
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
        </Points>
    )
}

export default Particles
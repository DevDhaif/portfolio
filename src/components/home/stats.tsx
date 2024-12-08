
"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Lines of Code", value: "100k+" },
    { label: "Happy Clients", value: "20+" },
]

export function Stats() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section ref={ref} className="py-12 bg-primary/5">
            <div className="container">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <div className="text-4xl font-bold text-primary">{stat.value}</div>
                            <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
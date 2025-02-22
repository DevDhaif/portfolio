"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Code, Users, Archive, Timer, Book } from "lucide-react"

interface WakatimeResponse {
    data: {
        formatted_time: string;
        total_seconds: number;
    }
}

interface PostsResponse {
    count: number;
}

export function Stats() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [codingHours, setCodingHours] = useState("2000+")
    const [postsCount, setPostsCount] = useState("0")
    const [isLoadingHours, setIsLoadingHours] = useState(true)
    const [isLoadingPosts, setIsLoadingPosts] = useState(true)

    useEffect(() => {
        async function fetchWakatime() {
            try {
                const response = await fetch('/api/wakatime')
                if (!response.ok) throw new Error('Failed to fetch data')

                const data: WakatimeResponse = await response.json()
                const hoursMatch = data.data.formatted_time.match(/(\d+,*\d*)\s*hrs/)
                if (hoursMatch) {
                    const hours = hoursMatch[1].replace(/,/g, '')
                    setCodingHours(`${hours}+`)
                }
            } catch (error) {
                console.error('Error fetching Wakatime data:', error)
                setCodingHours("2000+")
            } finally {
                setIsLoadingHours(false)
            }
        }

        async function fetchPostsCount() {
            try {
                const response = await fetch('/api/posts/count')
                if (!response.ok) throw new Error('Failed to fetch posts count')

                const data: PostsResponse = await response.json()
                setPostsCount(`${data.count}`)
            } catch (error) {
                console.error('Error fetching posts count:', error)
                setPostsCount("0")
            } finally {
                setIsLoadingPosts(false)
            }
        }

        fetchWakatime()
        fetchPostsCount()
    }, [])

    const stats = [
        {
            label: "Years Experience",
            value: "5+",
            icon: Timer,
            gradient: "from-blue-500 to-cyan-500",
            description: "Building modern web applications"
        },
        {
            label: "Projects Completed",
            value: "12+",
            icon: Archive,
            gradient: "from-indigo-500 to-blue-500",
            description: "Delivered on time and budget"
        },
        {
            label: "Hours of Code",
            value: codingHours,
            icon: Code,
            gradient: "from-cyan-500 to-blue-500",
            description: "Clean, maintainable code",
            isLoading: isLoadingHours
        },
        {
            label: "Blog Posts",
            value: postsCount,
            icon: Book,
            gradient: "from-blue-400 to-purple-500",
            description: "Articles & Tutorials",
            isLoading: isLoadingPosts
        },
        {
            label: "Happy Clients",
            value: "10+",
            icon: Users,
            gradient: "from-blue-400 to-indigo-500",
            description: "Satisfied with results"
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    }

    return (
        <section ref={ref} className="relative py-20 overflow-hidden">
            <motion.div
                className="container relative"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                className="group relative"
                            >
                                <div className="relative z-10 flex flex-col items-center p-6 backdrop-blur-sm rounded-xl border border-white/10 bg-white/5">
                                    <div className={`
                                        p-3 rounded-lg bg-gradient-to-br ${stat.gradient}
                                        transform group-hover:scale-110 transition-transform duration-300
                                    `}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    <motion.div
                                        className="mt-4 text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
                                        initial={{ scale: 0.5 }}
                                        animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 12,
                                            delay: index * 0.1 + 0.2
                                        }}
                                    >
                                        {stat.isLoading ? (
                                            <span className="inline-block w-16 h-8 bg-white/10 rounded animate-pulse" />
                                        ) : (
                                            stat.value
                                        )}
                                    </motion.div>

                                    <div className="mt-2 text-sm font-medium text-blue-100/80">
                                        {stat.label}
                                    </div>

                                    <div className="mt-2 text-xs text-blue-100/60">
                                        {stat.description}
                                    </div>

                                    <motion.div
                                        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500/50 to-cyan-500/50 opacity-0 group-hover:opacity-20 blur transition-all duration-300"
                                        style={{ zIndex: -1 }}
                                    />
                                </div>

                                <div className={`
                                    absolute inset-0 rounded-xl bg-gradient-to-br ${stat.gradient}
                                    opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300
                                `} />
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </section>
    )
}
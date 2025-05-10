"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Code, Users, Archive, Timer, Book } from "lucide-react"
import { PostsResponse, WakatimeResponse } from "@/types"

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
            // value: "2000+",
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

    return (
        <section ref={ref} className="relative py-20  overflow-hidden">
            <motion.div
                className="container relative"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
                    {stats.map((stat, index) => {
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="relative bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl py-6 px-4 text-center group hover:border-blue-500/30 transition-all duration-200"
                            >
                                {/* Icon container */}
                                <div className="p-3 rounded-lg bg-gray-800/80 text-blue-400 w-fit mb-5 group-hover:bg-blue-500 group-hover:text-white transition-all duration-200">
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                {/* Stats value */}
                                <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 group-hover:from-blue-400 group-hover:to-blue-200 transition-all duration-200">
                                    {stat.value}
                                </div>

                                {/* Label */}
                                <div className="text-base font-semibold text-white mb-1">
                                    {stat.label}
                                </div>

                                {/* Description */}
                                <div className="text-sm text-gray-400">
                                    {stat.description}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </section>
    )
}
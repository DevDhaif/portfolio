// src/components/home/contact.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Contact() {
    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                />
            </div>

            <div className="container relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Let's Work Together
                    </h2>
                    <p className="text-muted-foreground">
                        Have a project in mind? Let's discuss how we can help your business grow.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="max-w-2xl mx-auto">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-6"
                        >
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <label className="text-sm font-medium">Name</label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <label className="text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <label className="text-sm font-medium">Message</label>
                                    <textarea
                                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>
                                <Button className="w-full" size="lg">
                                    Send Message
                                </Button>
                            </form>
                        </motion.div>
                    </Card>
                </motion.div>

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 flex justify-center gap-6"
                >
                    {/* Add your social media links here */}
                </motion.div>
            </div>
        </section>
    )
}
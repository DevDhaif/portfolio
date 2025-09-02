"use client";

import { motion } from "framer-motion";

export function AboutSection() {
    return (
        <section id="about" className="section bg-muted">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            About Me
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            I'm a front-end developer specializing in React, Next.js, and modern web technologies. 
                            I create clean, efficient, and user-friendly web applications.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            With 5+ years of experience, I focus on writing maintainable code and 
                            delivering exceptional user experiences.
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {[
                            { label: "Years Experience", value: "5+" },
                            { label: "Projects Completed", value: "12+" },
                            { label: "Happy Clients", value: "30+" },
                            { label: "Technologies", value: "15+" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-6 card">
                                <div className="text-2xl font-bold text-accent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
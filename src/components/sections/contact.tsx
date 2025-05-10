"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Send, Mail, Phone, MapPin, Loader2, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ContactSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const { toast } = useToast();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus(null);

        try {
            // Simulate form submission - replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Set success state
            setFormStatus("success");

            // Show success toast
            toast({
                title: "Message sent!",
                description: "I'll get back to you as soon as possible.",
                variant: "default",
            });

            // Reset form after 1.5s
            setTimeout(() => {
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
                setFormStatus(null);
            }, 1500);

        } catch (error) {
            // Set error state
            setFormStatus("error");
            console.error("Error sending message:", error);
            // Show error toast
            toast({
                title: "Message failed to send",
                description: "Please try again or contact me directly via email.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="h-5 w-5" />,
            label: "Email",
            value: "devdhaif@gmail.com",
            href: "mailto:devdhaif@gmail.com",
            color: "accent-primary",
        },
        {
            icon: <Phone className="h-5 w-5" />,
            label: "Phone",
            value: "+966 536547818",
            href: "tel:+966536547818",
            color: "accent-secondary",
        },
        {
            icon: <MapPin className="h-5 w-5" />,
            label: "Location",
            value: "Riyadh, Saudi Arabia",
            href: "https://maps.google.com/?q=Riyadh,Saudi+Arabia",
            color: "accent-tertiary",
        },
    ];

    return (
        <section
            id="contact"
            ref={containerRef}
            className="py-24 md:py-32 relative overflow-hidden bg-background"
        >
            {/* Background elements */}
            {/* <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5 pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2 -left-64 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl opacity-20" />
            <div className="absolute top-3/4 -translate-y-1/2 -right-64 w-96 h-96 bg-accent-tertiary/20 rounded-full blur-3xl opacity-20" /> */}

            <motion.div
                style={{ opacity, y }}
                className="container max-w-6xl mx-auto px-4 relative z-10"
            >
                <SectionHeading
                    title="Get In Touch"
                    subtitle="Have a project in mind? Let's discuss how we can work together"
                    badge="Contact"
                />

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-text-primary">
                                Let&apos;s talk about your <span className="text-accent-primary">project</span>
                            </h3>

                            <p className="text-text-secondary">
                                Have a new project in mind? Looking to collaborate or work
                                together? I&apos;d love to hear from you. Reach out using this
                                form or contact me directly via email or phone.
                            </p>
                        </div>

                        {/* Contact cards */}
                        <div className="space-y-4 pt-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    href={info.href || "#"}
                                    target={info.href?.startsWith('http') ? "_blank" : undefined}
                                    rel={info.href?.startsWith('http') ? "noreferrer" : undefined}
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className={cn(
                                        "flex items-center gap-4 group p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-border-hover transition-all duration-300",
                                        info.href ? "cursor-pointer" : "cursor-default"
                                    )}
                                >
                                    <div className={cn(
                                        "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                                        `bg-${info.color}/10 text-${info.color}`
                                    )}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-text-secondary mb-1">
                                            {info.label}
                                        </h4>
                                        <p className={cn(
                                            "font-medium text-text-primary group-hover:text-accent-primary transition-colors",
                                            info.href && "group-hover:underline underline-offset-2"
                                        )}>
                                            {info.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Availability and social media */}
                        <div className="space-y-6 pt-4">
                            {/* Availability badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-primary"></span>
                                </span>
                                <span className="text-sm font-medium text-accent-primary">
                                    Available for new projects
                                </span>
                            </motion.div>

                            {/* Response time */}
                            <div className="text-text-secondary text-sm flex items-center gap-2">
                                <Clock className="h-4 w-4 text-accent-secondary" />
                                <span>Average response time: <span className="font-medium">24 hours</span></span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <div className="backdrop-blur-sm rounded-xl border border-border bg-card/50 p-6 relative overflow-hidden shadow-xl shadow-black/10">
                            {/* Success overlay */}
                            {formStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 z-20 bg-card flex flex-col items-center justify-center p-6"
                                >
                                    <div className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center mb-4">
                                        <Check className="w-8 h-8 text-accent-primary" />
                                    </div>
                                    <h3 className="text-xl font-medium text-text-primary mb-2">Message Sent!</h3>
                                    <p className="text-text-secondary text-center max-w-md">
                                        Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                                    </p>
                                </motion.div>
                            )}

                            {/* Error overlay */}
                            {formStatus === 'error' && (
                                <div className="absolute top-0 left-0 right-0 bg-red-500/10 border-b border-red-500/20 p-3 flex items-center">
                                    <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                                    <p className="text-sm text-red-400">
                                        There was an error sending your message. Please try again.
                                    </p>
                                </div>
                            )}

                            {/* Form pattern background */}
                            <div className="absolute pointer-events-none -top-24 -right-24 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl" />

                            <form onSubmit={handleSubmit} className="space-y-6 relative">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-text-primary">Your Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="border-border bg-background/50 focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-text-primary">Your Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="border-border bg-background/50 focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-text-primary">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="Project Inquiry"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="border-border bg-background/50 focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-text-primary">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell me about your project..."
                                        rows={6}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="border-border bg-background/50 focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-accent-primary hover:bg-accent-primary/90 text-black font-medium"
                                    disabled={isSubmitting || formStatus === 'success'}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending Message...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

// Missing Clock component from the code above
function Clock(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
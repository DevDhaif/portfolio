"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, Check, AlertCircle, Send, Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

const channels = [
    { label: "email", value: "devdhaif@gmail.com", href: "mailto:devdhaif@gmail.com", icon: Mail },
    { label: "phone", value: "+966 53 654 7818", href: "tel:+966536547818", icon: Phone },
    { label: "location", value: "Riyadh, Saudi Arabia", href: "https://maps.google.com/?q=Riyadh,Saudi+Arabia", icon: MapPin },
];

const inputClass = cn(
    "w-full rounded-md border border-rule bg-paper-sunken px-3.5 py-2.5",
    "font-mono text-sm text-ink placeholder:text-ink-faint",
    "focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal/40 transition-colors"
);

export function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const { toast } = useToast();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            return toast({ title: "Name is required", variant: "destructive" });
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return toast({ title: "Valid email is required", variant: "destructive" });
        }
        if (!formData.subject.trim()) {
            return toast({ title: "Subject is required", variant: "destructive" });
        }
        if (!formData.message.trim()) {
            return toast({ title: "Message is required", variant: "destructive" });
        }

        setIsSubmitting(true);
        setFormStatus(null);

        try {
            const result = await submitContactForm(formData);

            if (result.success) {
                setFormStatus("success");
                toast({
                    title: "Message sent",
                    description: "I'll get back to you shortly.",
                });
                setTimeout(() => {
                    setFormData({ name: "", email: "", subject: "", message: "" });
                    setFormStatus(null);
                }, 1800);
            } else {
                setFormStatus("error");
                toast({
                    title: "Send failed",
                    description: result.error || "Please try again or email me directly.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            setFormStatus("error");
            console.error("Error sending message:", error);
            toast({
                title: "Send failed",
                description: "Please try again or email me directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative bg-paper-panel py-24 md:py-32">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-scanline opacity-60" />
            <div className="container-dev relative">
                <SectionHeading
                    index="07"
                    eyebrow="get_in_touch"
                    title={
                        <>
                            Have a project?{" "}
                            <span className="relative inline-block">
                                Let&apos;s build it
                                <span aria-hidden className="absolute -bottom-2 left-0 h-2 w-full bg-signal/80" />
                            </span>.
                        </>
                    }
                    subtitle="Drop a brief ,  I reply within 24 hours."
                />

                <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Channel cards */}
                    <div className="lg:col-span-4 space-y-4">
                        {channels.map((c) => (
                            <a
                                key={c.label}
                                href={c.href}
                                target={c.href.startsWith("http") ? "_blank" : undefined}
                                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                                className="group flex items-center gap-4 rounded-lg border border-rule bg-paper-raised p-4 transition-all hover:border-signal/40 hover:bg-paper"
                            >
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-signal/40 bg-signal/10 text-signal transition-colors group-hover:bg-signal group-hover:text-ink-inverse">
                                    <c.icon className="h-4 w-4" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                                        {"// "}{c.label}
                                    </p>
                                    <p className="truncate font-medium text-ink group-hover:text-signal transition-colors">
                                        {c.value}
                                    </p>
                                </div>
                                <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:text-signal group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        ))}

                        <div className="rounded-lg border border-signal/30 bg-signal/5 p-4">
                            <div className="flex items-center gap-2">
                                <span className="relative inline-flex h-2 w-2">
                                    <span className="absolute inset-0 animate-ping rounded-full bg-signal/60" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                                </span>
                                <span className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                                    available
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-ink-muted">
                                Open to new projects and collaborations.
                            </p>
                        </div>
                    </div>

                    {/* Terminal-themed form */}
                    <div className="lg:col-span-8">
                        <div className="code-window relative">
                            <div className="code-window-header">
                                <span className="dot-light bg-[#ff5f56]" />
                                <span className="dot-light bg-[#ffbd2e]" />
                                <span className="dot-light bg-[#27c93f]" />
                                <span className="ml-2 font-mono text-xs text-ink-muted">
                                    ~/messages/new.txt
                                </span>
                            </div>

                            <form onSubmit={handleSubmit} className="relative p-5 md:p-7">
                                {formStatus === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-paper-sunken p-6 text-center"
                                    >
                                        <div className="grid h-14 w-14 place-items-center rounded-full border border-signal bg-signal/10 text-signal">
                                            <Check className="h-6 w-6" />
                                        </div>
                                        <p className="mt-5 font-display text-2xl font-bold text-ink">
                                            message sent.
                                        </p>
                                        <p className="mt-2 font-mono text-sm text-ink-muted">
                                            <span className="text-signal">→</span> reply incoming, soon.
                                        </p>
                                    </motion.div>
                                )}

                                {formStatus === "error" && (
                                    <div className="mb-5 flex items-center gap-2 rounded-md border border-danger/40 bg-danger/10 px-3 py-2">
                                        <AlertCircle className="h-4 w-4 text-danger" />
                                        <p className="text-sm text-ink-muted">
                                            send failed. try again or email directly.
                                        </p>
                                    </div>
                                )}

                                {/* Prompt */}
                                <p className="mb-5 font-mono text-sm text-ink-muted">
                                    <span className="text-signal">$</span>{" "}
                                    <span className="text-ink">message</span>
                                    <span className="text-accent">--to</span>{" "}
                                    <span className="text-ink">dhaif</span>
                                    <span className="ml-1 inline-block h-4 w-2 animate-blink bg-signal align-middle" />
                                </p>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Field label="name">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="your name"
                                            required
                                            className={inputClass}
                                        />
                                    </Field>
                                    <Field label="email">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@domain.com"
                                            required
                                            className={inputClass}
                                        />
                                    </Field>
                                </div>

                                <div className="mt-5">
                                    <Field label="subject">
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="project inquiry"
                                            required
                                            className={inputClass}
                                        />
                                    </Field>
                                </div>

                                <div className="mt-5">
                                    <Field label="message">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="tell me about your project ,  scope, timeline, anything that helps."
                                            required
                                            className={cn(inputClass, "resize-none leading-relaxed")}
                                        />
                                    </Field>
                                </div>

                                <div className="mt-7 flex items-center justify-between">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                                        {"// encrypted in transit"}
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || formStatus === "success"}
                                        className="btn-signal"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <Send className="h-3.5 w-3.5" />
                                        )}
                                        {isSubmitting ? "sending" : "send message"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                {"// "}{label}
            </label>
            <div className="mt-1.5">{children}</div>
        </div>
    );
}

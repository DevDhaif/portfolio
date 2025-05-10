// components/ui/loading.tsx
"use client"

import { LoadingProps } from "@/types"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export function Loading({ text = "Loading..." }: LoadingProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
            >
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-blue-100/70 text-sm"
            >
                {text}
            </motion.p>
        </div>
    )
}
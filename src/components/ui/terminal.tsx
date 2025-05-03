"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalProps {
    commands: string[];
    typingSpeed?: number;
    delayBetweenCommands?: number;
    className?: string;
    prompt?: string;
    title?: string;
    showTitle?: boolean;
    height?: string;
    stopAfterCycle?: boolean;
}

export function Terminal({
    commands,
    typingSpeed = 80,
    delayBetweenCommands = 2500,
    className,
    prompt = "user@portfolio:~$",
    title = "about.sh",
    showTitle = true,
    height = "h-96",
    stopAfterCycle = true,
}: TerminalProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentCommand, setCurrentCommand] = useState(0);
    const [cursorVisible, setCursorVisible] = useState(true);
    const [commandHistory, setCommandHistory] = useState<{ command: string, output: string | null }[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Cursor blink effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 530);

        return () => clearInterval(interval);
    }, []);

    // Generate appropriate output for a command
    const getCommandOutput = (command: string): string | null => {
        if (command.startsWith("Skills:")) {
            return "✓ Loaded developer skillset";
        } else if (command.startsWith("Experience:")) {
            return "→ Professional experience verified";
        } else if (command.startsWith("Projects:")) {
            return "✓ Project portfolio available";
        } else if (command.startsWith("Education:")) {
            return "✓ Academic background confirmed";
        } else if (command.startsWith("Interests:")) {
            return "→ Personal interests noted";
        } else if (command.startsWith("Contact:")) {
            return "✓ Contact information stored";
        }
        return null;
    };

    // Typing effect
    useEffect(() => {
        if (commands.length === 0 || isFinished) return;

        const command = commands[currentCommand];
        let timeout: NodeJS.Timeout;

        if (displayedText.length < command.length) {
            // Typing effect
            const variableSpeed = typingSpeed * (0.5 + Math.random());
            timeout = setTimeout(() => {
                setDisplayedText(command.substring(0, displayedText.length + 1));
            }, variableSpeed);
        } else {
            // Finished typing, add to history and move to next command
            timeout = setTimeout(() => {
                const output = getCommandOutput(command);
                setCommandHistory(prev => [...prev, { command, output }]);
                setDisplayedText("");

                // Check if we've completed all commands
                if (currentCommand === commands.length - 1 && stopAfterCycle) {
                    setIsFinished(true);
                } else {
                    setCurrentCommand((current) => (current + 1) % commands.length);
                }
            }, delayBetweenCommands);
        }

        // Scroll to bottom as content changes
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }

        return () => clearTimeout(timeout);
    }, [commands, currentCommand, displayedText, isFinished, stopAfterCycle, typingSpeed, delayBetweenCommands]);

    // Handle auto-scrolling
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [displayedText, commandHistory]);

    // Calculate prompt width for proper text wrapping
    const promptWidth = useRef<number | null>(null);
    useEffect(() => {
        // Create a temporary span to measure the prompt width
        if (typeof document !== 'undefined' && !promptWidth.current) {
            const span = document.createElement('span');
            span.style.visibility = 'hidden';
            span.style.position = 'absolute';
            span.style.whiteSpace = 'nowrap';
            span.style.fontFamily = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";
            span.style.fontSize = '0.875rem'; // text-sm
            span.textContent = prompt + ' ';
            document.body.appendChild(span);
            promptWidth.current = span.getBoundingClientRect().width;
            document.body.removeChild(span);
        }
    }, [prompt]);

    return (
        <div
            className={cn(
                "rounded-lg overflow-hidden w-full border border-zinc-800 shadow-lg bg-[#0c0c0c]",
                "hover:border-emerald-500/30 hover:shadow-emerald-500/10 transition-all duration-300",
                className
            )}
        >
            {/* Terminal header */}
            {showTitle && (
                <div className="bg-[#1a1a1a] border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="text-sm font-mono text-zinc-400 ml-3 opacity-80">{title}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <TerminalIcon className="h-3.5 w-3.5 text-emerald-500 mr-1" />
                        <span className="text-xs font-mono text-zinc-500">bash</span>
                    </div>
                </div>
            )}

            {/* Terminal content */}
            <div
                ref={terminalRef}
                className={cn(
                    "p-4 font-mono text-sm overflow-auto bg-[#0c0c0c]",
                    height
                )}
                style={{
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
                }}
            >
                {/* Command history - Using a trick with css to make wrapped text behave like a real terminal */}
                {commandHistory.map((entry, index) => (
                    <div key={index} className="mb-4">
                        <div className="terminal-line">
                            <span className="terminal-prompt text-[#50fa7b] font-medium">{prompt}</span>
                            <span className="text-gray-300">{entry.command}</span>
                        </div>

                        {/* Command output */}
                        {entry.output && (
                            <div className="text-cyan-300 mt-1 text-xs">
                                {entry.output}
                            </div>
                        )}
                    </div>
                ))}

                {/* Current command being typed */}
                {!isFinished && displayedText && (
                    <div className="terminal-line">
                        <span className="terminal-prompt text-[#50fa7b] font-medium">{prompt}</span>
                        <span className="text-gray-300">{displayedText}</span>
                        <span
                            className={cn(
                                "inline-block w-2.5 h-4 ml-0.5 align-text-bottom",
                                cursorVisible ? "bg-gray-300" : "bg-transparent",
                                "transition-colors duration-100"
                            )}
                        ></span>
                    </div>
                )}
            </div>

            {/* Add these styles to your global CSS or create a style tag in your component */}
            <style jsx>{`
                .terminal-line {
                    position: relative;
                    padding-left: 0;
                    white-space: pre-wrap;
                    word-break: break-word;
                    line-height: 1.5;
                }
                
                .terminal-prompt {
                    white-space: nowrap;
                    margin-right: 0.5rem;
                }
                
                /* This is the key to making wrapped lines align to the left edge */
                .terminal-line::before {
                    content: "";
                    display: inline-block;
                }
                
                /* First line has the prompt */
                .terminal-line:first-line {
                    display: inline-block;
                }
            `}</style>
        </div>
    );
}
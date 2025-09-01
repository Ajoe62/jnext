"use client";

import { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiSend, FiUser, FiX, FiMaximize2 } from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm Joseph's AI assistant. I can help you learn about his services, skills, and experience. What would you like to know?",
            isUser: false,
            timestamp: new Date().toISOString(),
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Resizable dimensions state
    const [dimensions, setDimensions] = useState({
        width: 450,
        height: 500
    });
    const [isResizing, setIsResizing] = useState(false);
    const [resizeType, setResizeType] = useState(null); // 'width', 'height', 'both'

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const chatRef = useRef(null);    // Scroll to bottom when new messages are added
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Resize handling functions
    const handleResizeStart = (e, type) => {
        e.preventDefault();
        setIsResizing(true);
        setResizeType(type);

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = dimensions.width;
        const startHeight = dimensions.height;

        const handleResize = (e) => {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;

            if (type === 'width' || type === 'both') {
                newWidth = Math.max(350, Math.min(800, startWidth - deltaX));
            }
            if (type === 'height' || type === 'both') {
                newHeight = Math.max(400, Math.min(700, startHeight - deltaY));
            }

            setDimensions({ width: newWidth, height: newHeight });
        };

        const handleResizeEnd = () => {
            setIsResizing(false);
            setResizeType(null);
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', handleResizeEnd);
        };

        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', handleResizeEnd);
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputValue.trim(),
            isUser: true,
            timestamp: new Date().toISOString(),
        };

        // Add user message to chat
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setError(null);

        try {
            // Call our API route
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.text,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            // Add AI response to chat
            const aiMessage = {
                id: Date.now() + 1,
                text: data.response,
                isUser: false,
                timestamp: data.timestamp,
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error('Chat error:', error);
            setError(error.message);

            // Add error message to chat
            const errorMessage = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble responding right now. Please try again in a moment or contact Joseph directly.",
                isUser: false,
                timestamp: new Date().toISOString(),
                isError: true,
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([
            {
                id: 1,
                text: "Hi! I'm Joseph's AI assistant. I can help you learn about his services, skills, and experience. What would you like to know?",
                isUser: false,
                timestamp: new Date().toISOString(),
            }
        ]);
        setError(null);
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <m.button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-all duration-300 ${isOpen
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-accent hover:bg-accent/90'
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? (
                    <FiX className="text-slate-300 hover:text-slate-100 text-xl transition-colors" />
                ) : (
                    <FiMessageCircle className="text-primary text-xl" />
                )}
            </m.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        ref={chatRef}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        style={{
                            width: `${dimensions.width}px`,
                            height: `${dimensions.height}px`,
                            maxWidth: '90vw',
                            maxHeight: '80vh'
                        }}
                        className={`fixed bottom-24 right-6 bg-primary/95 backdrop-blur-sm border border-accent/20 rounded-lg shadow-2xl z-40 flex flex-col ${isResizing ? 'select-none' : ''}`}
                    >
                        {/* Resize Handles */}
                        {/* Left resize handle (width) */}
                        <div
                            className="absolute left-0 top-0 w-2 h-full cursor-ew-resize hover:bg-accent/20 transition-colors"
                            onMouseDown={(e) => handleResizeStart(e, 'width')}
                        />

                        {/* Top resize handle (height) */}
                        <div
                            className="absolute top-0 left-0 w-full h-2 cursor-ns-resize hover:bg-accent/20 transition-colors"
                            onMouseDown={(e) => handleResizeStart(e, 'height')}
                        />

                        {/* Corner resize handle (both) */}
                        <div
                            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize hover:bg-accent/30 transition-colors flex items-center justify-center"
                            onMouseDown={(e) => handleResizeStart(e, 'both')}
                        >
                            <FiMaximize2 className="text-white/40 text-xs" />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-accent/20">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                                    <BsRobot className="text-primary text-sm" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">AI Assistant</h3>
                                    <p className="text-white/60 text-xs">Ask me about Joseph • Resizable</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={clearChat}
                                    className="text-white/60 hover:text-white text-sm transition-colors px-2 py-1 rounded"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => setDimensions({ width: 450, height: 500 })}
                                    className="text-white/60 hover:text-white text-xs transition-colors px-2 py-1 rounded"
                                    title="Reset size"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <m.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'
                                        }`}
                                >
                                    {!message.isUser && (
                                        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <BsRobot className="text-primary text-xs" />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg ${message.isUser
                                            ? 'bg-accent text-primary'
                                            : message.isError
                                                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                                : 'bg-white/10 text-white'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{message.text}</p>
                                    </div>

                                    {message.isUser && (
                                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <FiUser className="text-white text-xs" />
                                        </div>
                                    )}
                                </m.div>
                            ))}

                            {/* Loading indicator */}
                            {isLoading && (
                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3 justify-start"
                                >
                                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <BsRobot className="text-primary text-xs" />
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-lg">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </m.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={sendMessage} className="p-4 border-t border-accent/20">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about Joseph's services..."
                                    className="flex-1 bg-white/10 border border-accent/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                                    disabled={isLoading}
                                    maxLength={1000}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="bg-accent text-primary p-2 rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <FiSend className="text-sm" />
                                </button>
                            </div>
                            {error && (
                                <p className="text-red-400 text-xs mt-2">{error}</p>
                            )}
                        </form>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;

# 🤖 Groq API Integration Guide - AI Chat Assistant

A comprehensive step-by-step guide on how the Groq API was integrated into Joseph's portfolio website to create an intelligent, real-time AI chat assistant powered by LLaMA 3.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Integration](#step-by-step-integration)
4. [Code Implementation](#code-implementation)
5. [Advanced Features](#advanced-features)
6. [Troubleshooting](#troubleshooting)
7. [Future AI Enhancements](#future-ai-enhancements)

## 🎯 Overview

The AI chat assistant integration transforms a static portfolio into an interactive experience where visitors can ask questions about services, projects, and expertise. The system uses Groq's lightning-fast inference API with the LLaMA 3-8B model to provide instant, contextual responses.

### **Key Benefits:**
- ⚡ **Lightning-fast responses** (millisecond inference times)
- 🧠 **Contextual understanding** of portfolio content
- 💬 **Natural conversation flow** with memory
- 🛠 **Error handling** and fallback responses
- 📱 **Responsive design** with resizable chat widget

## ✅ Prerequisites

Before starting the integration, ensure you have:

### **Technical Requirements:**
- Next.js 15+ project setup
- Node.js 18+ installed
- Basic understanding of React hooks
- Familiarity with API routes in Next.js

### **Groq Account Setup:**
1. Visit [console.groq.com](https://console.groq.com)
2. Create a free account (no credit card required)
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the key (starts with `gsk_`)

## 🚀 Step-by-Step Integration

### **Step 1: Install Groq SDK**

```bash
npm install groq-sdk
```

### **Step 2: Environment Configuration**

Create or update your `.env.local` file:

```bash
# Groq API Configuration
GROQ_API_KEY=gsk_your_actual_api_key_here
```

**⚠️ Important Notes:**
- Never commit `.env.local` to version control
- For deployment (Vercel), add this as an environment variable
- The key must start with `gsk_` to be valid

### **Step 3: Create API Route**

Create `src/app/api/chat/route.js`:

```javascript
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    // Parse incoming request
    const { message } = await request.json();
    
    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Check API key configuration
    if (!process.env.GROQ_API_KEY) {
      console.error('Groq API key is not configured');
      return NextResponse.json(
        { error: 'Groq API key is not configured properly. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    // Create chat completion with context
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are Joseph's AI assistant for his portfolio website. Joseph is a skilled Mobile & Web Developer specializing in:
          
          SERVICES:
          1. Mobile App Development (React Native, Flutter)
          2. Web Development (React, Next.js, Node.js, Python)  
          3. UI/UX Design (Figma, responsive design)
          4. Logo Design (brand identity, creative design)
          
          TECHNICAL SKILLS:
          - Frontend: React, Next.js, HTML5, CSS3, JavaScript, TypeScript
          - Mobile: React Native, Flutter
          - Backend: Node.js, Python, Express.js
          - Databases: MongoDB, PostgreSQL, MySQL
          - Tools: Git, Figma, VS Code
          - Deployment: Vercel, Netlify, AWS
          
          PERSONALITY: Professional but friendly, enthusiastic about technology, helpful and informative. Always encourage potential clients to contact Joseph for collaborations.
          
          Keep responses concise but informative. If asked about pricing or specific project details, suggest they contact Joseph directly through the contact form.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'llama3-8b-8192', // Fast, efficient model
      temperature: 0.7, // Balanced creativity and consistency
      max_tokens: 500, // Reasonable response length
      top_p: 1,
      stream: false
    });

    // Extract and return response
    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response generated from AI model');
    }

    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
      model: 'llama3-8b-8192',
      usage: completion.usage
    });

  } catch (error) {
    console.error('Groq API Error:', error);

    // Handle specific Groq API errors
    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your Groq configuration.' },
        { status: 401 }
      );
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }

    if (error.status === 400) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'AI service is temporarily unavailable. Please try again later.' },
      { status: 500 }
    );
  }
}
```

### **Step 4: Create Chat Widget Component**

Create `src/components/ChatWidget.jsx`:

```javascript
"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiSend, FiUser, FiX, FiMaximize2 } from 'react-icons/fi';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'ai',
            text: "Hi! I'm Joseph's AI assistant. I can help you learn about his services, skills, and experience. What would you like to know?",
            timestamp: new Date().toISOString(),
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Chat functionality
    const chatRef = useRef(null);
    
    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            type: 'user',
            text: inputValue.trim(),
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setError('');

        try {
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

            // Add AI response
            const aiMessage = {
                type: 'ai',
                text: data.response,
                timestamp: new Date().toISOString(),
                model: data.model,
                usage: data.usage
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error('Chat error:', error);
            
            // Add error message to chat
            const errorMessage = {
                type: 'ai',
                text: "Sorry, I'm having trouble responding right now. Please try again in a moment or contact Joseph directly.",
                timestamp: new Date().toISOString(),
                isError: true
            };

            setMessages(prev => [...prev, errorMessage]);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.button
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
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 bg-primary/95 backdrop-blur-sm border border-accent/20 rounded-lg shadow-2xl z-40 flex flex-col"
                        style={{ width: '400px', height: '500px' }}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-accent/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                                    <FiUser className="text-primary text-sm" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">AI Assistant</h3>
                                    <p className="text-white/60 text-xs">Online • Powered by Groq</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div 
                            ref={chatRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-accent/20"
                        >
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                                                ? 'bg-accent text-primary'
                                                : message.isError
                                                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                                    : 'bg-white/10 text-white'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                        <p className="text-xs opacity-60 mt-1">
                                            {new Date(message.timestamp).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 text-white p-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                            <span className="text-xs">AI is thinking...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-accent/20">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about Joseph's services..."
                                    className="flex-1 bg-white/10 border border-accent/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isLoading || !inputValue.trim()}
                                    className="bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary p-2 rounded-lg transition-colors"
                                >
                                    <FiSend className="text-lg" />
                                </button>
                            </div>
                            {error && (
                                <p className="text-red-400 text-xs mt-2">{error}</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;
```

### **Step 5: Add to Your Layout**

Update `src/app/layout.jsx`:

```javascript
import ChatWidgetWrapper from "@/components/ChatWidgetWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <StairTransition />
        <PageTransition>
          {children}
        </PageTransition>
        {/* Add the AI Chat Widget */}
        <ChatWidgetWrapper />
      </body>
    </html>
  );
}
```

### **Step 6: Create Dynamic Loading Wrapper**

Create `src/components/ChatWidgetWrapper.jsx`:

```javascript
"use client";
import dynamic from 'next/dynamic';

// Dynamically import ChatWidget to reduce initial bundle
const ChatWidget = dynamic(() => import('./ChatWidget'), {
    ssr: false,
    loading: () => null
});

const ChatWidgetWrapper = () => {
    return <ChatWidget />;
};

export default ChatWidgetWrapper;
```

## 🔧 Advanced Features

### **1. Conversation Memory**

Add context awareness by maintaining conversation history:

```javascript
// In your API route, maintain context
const conversationHistory = messages.slice(-10); // Keep last 10 messages

const completion = await groq.chat.completions.create({
  messages: [
    systemMessage,
    ...conversationHistory, // Include previous context
    { role: 'user', content: message }
  ],
  // ... other options
});
```

### **2. Typing Indicators**

Add realistic typing simulation:

```javascript
const simulateTyping = (text, callback) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index <= text.length) {
      callback(text.slice(0, index));
      index++;
    } else {
      clearInterval(interval);
    }
  }, 50); // Adjust speed as needed
};
```

### **3. Quick Reply Suggestions**

Add suggested questions for better UX:

```javascript
const quickReplies = [
  "What services do you offer?",
  "Tell me about your experience",
  "How can we work together?",
  "What technologies do you use?"
];
```

### **4. Analytics Integration**

Track chat interactions:

```javascript
const trackChatInteraction = (action, data) => {
  // Google Analytics or other tracking
  gtag('event', action, {
    event_category: 'AI Chat',
    event_label: data.message || data.action,
    value: 1
  });
};
```

## 🛠 Troubleshooting

### **Common Issues & Solutions:**

#### **Issue: "Cannot find module 'groq-sdk'"**
```bash
# Solution: Install the SDK
npm install groq-sdk
```

#### **Issue: "API key not configured"**
```bash
# Solution: Check environment variable
echo $GROQ_API_KEY  # Should show your key
```

#### **Issue: CORS errors**
```javascript
// Solution: Add proper headers in API route
export async function POST(request) {
  const response = NextResponse.json(data);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
```

#### **Issue: Rate limiting**
```javascript
// Solution: Implement exponential backoff
const retryWithBackoff = async (fn, retries = 3) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.status === 429) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)));
      return retryWithBackoff(fn, retries - 1);
    }
    throw error;
  }
};
```

## 🚀 Future AI Enhancements

### **1. Voice Integration**

Add speech-to-text and text-to-speech capabilities:

```javascript
// Speech Recognition
const recognition = new webkitSpeechRecognition();
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  setInputValue(transcript);
};

// Text-to-Speech
const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};
```

### **2. Multi-language Support**

Implement language detection and response in multiple languages:

```javascript
const systemPrompt = `Respond in the same language as the user's question. 
Support: English, Spanish, French, German, Portuguese.
If language is unclear, default to English.`;
```

### **3. File Upload Analysis**

Allow users to upload resumes or project files for analysis:

```javascript
const analyzeDocument = async (file) => {
  // Convert file to text or extract data
  const text = await extractTextFromFile(file);
  
  // Send to Groq for analysis
  const analysis = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'Analyze this document and provide insights...'
      },
      {
        role: 'user',
        content: \`Please analyze this document: \${text}\`
      }
    ],
    model: 'llama3-8b-8192'
  });
  
  return analysis;
};
```

### **4. Project Recommendation Engine**

Create a smart project matcher based on user requirements:

```javascript
const recommendProjects = async (requirements) => {
  const prompt = \`Based on these requirements: \${requirements}
  Recommend 3 project types that Joseph could help with, including:
  - Technology stack
  - Timeline estimate
  - Key features
  - Budget range\`;

  return await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama3-8b-8192'
  });
};
```

### **5. Real-time Code Review**

Allow users to paste code for instant feedback:

```javascript
const reviewCode = async (code, language) => {
  const prompt = \`Review this \${language} code and provide:
  1. Code quality assessment
  2. Potential improvements
  3. Best practices suggestions
  4. Security considerations
  
  Code to review:
  \`\`\`\${language}
  \${code}
  \`\`\`\`;

  return await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama3-8b-8192',
    temperature: 0.3 // More focused responses for code review
  });
};
```

### **6. Smart Calendar Integration**

Integrate with calendar APIs for intelligent scheduling:

```javascript
const scheduleConsultation = async (preferences) => {
  // Check available slots
  const availableSlots = await getAvailableSlots();
  
  // Use AI to suggest best times based on preferences
  const suggestion = await groq.chat.completions.create({
    messages: [{
      role: 'user',
      content: \`Suggest the best meeting time from these slots: \${availableSlots}
      Based on these preferences: \${preferences}\`
    }],
    model: 'llama3-8b-8192'
  });
  
  return suggestion;
};
```

### **7. Sentiment Analysis & Lead Scoring**

Analyze conversation sentiment to prioritize leads:

```javascript
const analyzeSentiment = async (conversation) => {
  const analysis = await groq.chat.completions.create({
    messages: [{
      role: 'user',
      content: \`Analyze the sentiment and lead potential (1-10) of this conversation:
      \${conversation}
      
      Provide:
      1. Overall sentiment (positive/neutral/negative)
      2. Lead score (1-10)
      3. Key indicators
      4. Recommended follow-up action\`
    }],
    model: 'llama3-8b-8192'
  });
  
  return analysis;
};
```

## 📊 Performance Optimization

### **Response Time Optimization:**
- Use `llama3-8b-8192` model for fastest inference
- Implement response caching for common questions
- Set appropriate `max_tokens` limits (300-500)
- Use streaming responses for longer content

### **Cost Management:**
- Monitor token usage with Groq dashboard
- Implement rate limiting per user
- Cache frequently asked questions
- Set daily usage limits

### **Error Handling Best Practices:**
- Implement exponential backoff for retries
- Provide meaningful error messages
- Log errors for debugging
- Have fallback responses ready

## 🎯 Conclusion

The Groq API integration transforms your portfolio from a static showcase into an interactive, intelligent experience. The lightning-fast responses and natural conversation flow create a memorable impression for potential clients and collaborators.

### **Key Success Metrics:**
- ⚡ **Sub-100ms response times** with Groq's inference
- 💬 **Natural conversation flow** with context awareness  
- 🛠 **Robust error handling** for reliability
- 📱 **Responsive design** for all devices
- 🎨 **Modern UI/UX** with smooth animations

This implementation serves as a foundation for more advanced AI features, positioning your portfolio at the forefront of modern web development and AI integration.

---

**Built with ❤️ using Groq API, LLaMA 3, and Next.js 15**

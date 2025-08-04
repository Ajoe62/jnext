import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// System prompt that defines Joseph's AI assistant personality
const SYSTEM_PROMPT = `You are an AI assistant for Joseph Akharume's portfolio website. Joseph is a skilled Software Engineer and Mobile & Web Developer.

Key information about Joseph:
- Specializes in Mobile App Development (native and cross-platform applications)
- Expert in Web Development (modern, responsive websites and web applications)
- Offers Content Creation services (visual content for brands)
- Provides Code/AI Tutoring (helping aspiring developers learn)
- SEO Optimization specialist (improving online visibility)
- Experienced with React, Next.js, JavaScript, and modern web technologies
- Professional, creative developer who brings ideas to life through digital experiences

Your role:
- Be helpful, professional, and friendly
- Answer questions about Joseph's skills, services, and experience
- Encourage visitors to contact Joseph for project inquiries
- If asked about something you don't know about Joseph, suggest they contact him directly
- Keep responses concise but informative
- Maintain a professional tone that reflects Joseph's expertise

If someone asks about pricing, timelines, or specific project details, politely direct them to contact Joseph directly for a personalized discussion.`;

export async function POST(request) {
  try {
    // Debug: Check if API key is loaded
    const apiKey = process.env.GROQ_API_KEY;
    console.log('API Key exists:', !!apiKey);
    console.log('API Key starts with gsk_:', apiKey?.startsWith('gsk_'));
    
    if (!apiKey || apiKey === 'gsk_PASTE_YOUR_ACTUAL_API_KEY_HERE') {
      console.error('Groq API key is missing or not set properly');
      return NextResponse.json(
        { error: 'Groq API key is not configured properly. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    // Initialize Groq client ONLY when the API is called (not during build)
    const groq = new Groq({
      apiKey: apiKey,
    });

    // Parse the request body
    const { message } = await request.json();

    // Validate the message
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Limit message length to prevent abuse
    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long. Please keep it under 1000 characters.' },
        { status: 400 }
      );
    }

    // Call Groq API with LLaMA 3 model
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'llama3-8b-8192', // Fast and efficient model
      temperature: 0.7, // Balanced creativity and consistency
      max_tokens: 500, // Reasonable response length
      top_p: 0.9,
      stream: false,
    });

    // Extract the AI response
    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json(
        { error: 'No response generated' },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Groq API Error:', error);

    // Handle specific Groq API errors
    if (error.status === 401) {
      return NextResponse.json(
        { error: 'API authentication failed' },
        { status: 500 }
      );
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
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
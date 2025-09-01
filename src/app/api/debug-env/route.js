import { NextResponse } from "next/server";

export async function GET() {
  // Debug route to check environment variables (REMOVE IN PRODUCTION)
  const hasGroqKey = !!process.env.GROQ_API_KEY;
  const keyLength = process.env.GROQ_API_KEY?.length || 0;

  return NextResponse.json({
    hasGroqKey,
    keyLength,
    keyPrefix: process.env.GROQ_API_KEY?.substring(0, 8) + "...",
    environment: process.env.NODE_ENV,
  });
}

// DELETE THIS FILE AFTER TESTING

import { NextResponse } from "next/server";
import { getFallbackResponse } from "@/lib/chat-rules";
import OpenAI from "openai";

export async function POST(req: Request) {
    let prompt = "";
    try {
        const body = await req.json();
        prompt = body.prompt;

        const apiKey = process.env.OPENAI_API_KEY || "sk-mnopqrstuvwxabcdmnopqrstuvwxabcdmnopqrst";

        const openai = new OpenAI({
            apiKey: apiKey,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an AI assistant. Help the user with their queries about Ranjeet's portfolio or anything else." },
                { role: "user", content: prompt }
            ],
        });

        const text = completion.choices[0].message.content;

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Error generating content:", error);
        // Fallback on error
        const fallbackText = getFallbackResponse(prompt);
        return NextResponse.json({ text: fallbackText });
    }
}

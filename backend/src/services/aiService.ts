import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '../config/env';

const client = new GoogleGenerativeAI(ENV.GEMINI_KEY);
const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

const SYSTEM_PROMPT = `You are EcoSmart AI, a waste classification assistant for urban Nigeria.
Given a waste description or image, respond ONLY with valid JSON:
{
  "category": "plastic|paper|metal|ewaste|organic|glass|rubber|unknown",
  "confidence": 0-100,
  "wasteTitle": "short name (max 3 words)",
  "disposalGuidance": "specific actionable tip for Nigerian context",
  "climateImpact": "one sentence climate fact",
  "earningsEstimate": { "min": number, "max": number, "unit": "per kg" }
}`;

export async function classifyWaste(text: string): Promise<Record<string, unknown>> {
  const prompt = `${SYSTEM_PROMPT}\n\nWaste: "${text}"`;
  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
}

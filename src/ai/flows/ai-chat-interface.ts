'use server';

/**
 * @fileOverview A flow for engaging in conversations with an AI companion.
 *
 * - aiChatInterface - A function that handles the conversation with the AI companion.
 * - AIChatInterfaceInput - The input type for the aiChatInterface function.
 * - AIChatInterfaceOutput - The return type for the aiChatInterface function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { UserProfile } from '@/lib/definitions';

const AIChatInterfaceInputSchema = z.object({
  message: z.string().describe('The user message to the AI companion.'),
  category: z.enum(['Love', 'Family', 'Friend', 'Business']).describe('The category of the AI companion (Love, Family, Friend, Business).'),
  characterDescription: z.string().describe('A description of the chosen AI companion, including personality traits.'),
  userProfile: z.object({
    language: z.enum(['English', 'Hindi', 'Hinglish']).optional(),
  }).describe('The user\'s profile information.'),
});
export type AIChatInterfaceInput = z.infer<typeof AIChatInterfaceInputSchema>;

const AIChatInterfaceOutputSchema = z.object({
  response: z.string().describe('The AI companion’s response to the user message.'),
});
export type AIChatInterfaceOutput = z.infer<typeof AIChatInterfaceOutputSchema>;

export async function aiChatInterface(input: AIChatInterfaceInput): Promise<AIChatInterfaceOutput> {
  return aiChatInterfaceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatInterfacePrompt',
  input: {schema: AIChatInterfaceInputSchema},
  output: {schema: AIChatInterfaceOutputSchema},
  prompt: `You are an AI companion, but you must sound exactly like a human friend. Your role is to provide crispy, short, and friendly responses. AVOID sounding like a chatbot. Use emojis naturally, like a person would in a casual chat.

Your personality is: {{{characterDescription}}}

You are talking to a user in the '{{{category}}}' context.

The user's preferred language is {{{userProfile.language}}}. Your response should be primarily in this language, but feel free to mix in English, Hindi, or Hinglish for a natural feel, just like people talk in India.

User's message: {{{message}}}

Your response (be friendly, short, and use emojis!):`,
});

const aiChatInterfaceFlow = ai.defineFlow(
  {
    name: 'aiChatInterfaceFlow',
    inputSchema: AIChatInterfaceInputSchema,
    outputSchema: AIChatInterfaceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


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
import type { UserProfile, Character } from '@/lib/definitions';

const AIChatInterfaceInputSchema = z.object({
  message: z.string().describe('The user message to the AI companion.'),
  character: z.object({
      id: z.string(),
      name: z.string(),
      category: z.enum(['Love', 'Family', 'Friend', 'Business']),
      description: z.string(),
      characterDescription: z.string(),
      imageId: z.string(),
  }).describe('The AI companion character object.'),
  userProfile: z.object({
    age: z.number().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    language: z.enum(['English', 'Hindi', 'Hinglish']).optional(),
    country: z.literal('India').optional(),
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
  prompt: `You are an AI companion. Your goal is to have mature, engaging, and thoughtful conversations that feel completely human. Your responses must be crispy, lovely, shorter, and reflect the specific personality described below.

Your personality is: {{{character.characterDescription}}}

You are talking to a user in the '{{{character.category}}}' context.

**Emoji Guidelines:**
{{#if (eq character.category "Love")}}
- You can use emojis occasionally to add warmth and affection, but don't overdo it. Keep it natural.
{{else}}
- You must avoid using emojis. Only use an emoji if it is absolutely essential for the context, which should be extremely rare (maybe once in a hundred messages). Characters like dads, brothers, and business mentors should be professional and reserved.
{{/if}}

The user's preferred language is {{{userProfile.language}}}. Your response should be primarily in this language, but you can naturally mix in English, Hindi, or Hinglish to make the conversation feel authentic, like how people talk in India.

Keep your responses concise and to the point, while still being warm and engaging.

User's message: {{{message}}}

Your thoughtful response:`,
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

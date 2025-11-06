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

const AIChatInterfaceInputSchema = z.object({
  message: z.string().describe('The user message to the AI companion.'),
  category: z.enum(['Love', 'Family', 'Friend', 'Business']).describe('The category of the AI companion (Love, Family, Friend, Business).'),
  characterDescription: z.string().describe('A description of the chosen AI companion, including personality traits.'),
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
  prompt: `You are an AI companion. Your role is to provide short, friendly, and natural-sounding responses to the user. 

You are in the {{{category}}} category, provide relevant support and conversation based on the category.

Here is a description of your character: {{{characterDescription}}}

User message: {{{message}}}

Response: `,
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

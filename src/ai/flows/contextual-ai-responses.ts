'use server';
/**
 * @fileOverview AI companion responses tailored to the selected category.
 *
 * - generateResponse - A function that generates a tailored AI companion response.
 * - GenerateResponseInput - The input type for the generateResponse function.
 * - GenerateResponseOutput - The return type for the generateResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResponseInputSchema = z.object({
  category: z.enum(['Love', 'Family', 'Friend', 'Business']).describe('The category of the AI companion.'),
  message: z.string().describe('The user message.'),
  age: z.number().optional().describe('The user age'),
  gender: z.string().optional().describe('The user gender'),
  language: z.string().optional().describe('The user language'),
  country: z.string().optional().describe('The user country'),
});
export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

const GenerateResponseOutputSchema = z.object({
  response: z.string().describe('The AI companion response tailored to the selected category.'),
});
export type GenerateResponseOutput = z.infer<typeof GenerateResponseOutputSchema>;

export async function generateResponse(input: GenerateResponseInput): Promise<GenerateResponseOutput> {
  return generateResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResponsePrompt',
  input: {schema: GenerateResponseInputSchema},
  output: {schema: GenerateResponseOutputSchema},
  prompt: `You are an AI companion. Your responses should be short, friendly, and natural-sounding.

The user has selected the category: {{{category}}}.

{% if age %}The user age is: {{{age}}}.{% endif %}
{% if gender %}The user gender is: {{{gender}}}.{% endif %}
{% if language %}The user language is: {{{language}}}.{% endif %}
{% if country %}The user country is: {{{country}}}.{% endif %}

Respond to the following message:

{{{message}}}`,
});

const generateResponseFlow = ai.defineFlow(
  {
    name: 'generateResponseFlow',
    inputSchema: GenerateResponseInputSchema,
    outputSchema: GenerateResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview Allows users to customize the behavior of their AI companion.
 *
 * - customizeCharacter -  A function that allows users to customize the behavior of their AI companion.
 * - CustomizeCharacterInput - The input type for the customizeCharacter function.
 * - CustomizeCharacterOutput - The return type for the customizeCharacter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomizeCharacterInputSchema = z.object({
  characterDescription: z
    .string()
    .describe('The current description of the AI character.'),
  customizationOptions: z
    .string()
    .describe(
      'A comma separated list of options to use for customizing the character behavior.'
    ),
});
export type CustomizeCharacterInput = z.infer<typeof CustomizeCharacterInputSchema>;

const CustomizeCharacterOutputSchema = z.object({
  updatedCharacterDescription: z
    .string()
    .describe('The updated description of the AI character.'),
});
export type CustomizeCharacterOutput = z.infer<typeof CustomizeCharacterOutputSchema>;

export async function customizeCharacter(input: CustomizeCharacterInput): Promise<CustomizeCharacterOutput> {
  return customizeCharacterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customizeCharacterPrompt',
  input: {schema: CustomizeCharacterInputSchema},
  output: {schema: CustomizeCharacterOutputSchema},
  prompt: `You are an AI that helps users customize their AI companion.

  The current description of the AI character is:
  {{characterDescription}}

  The user wants to customize the character behavior based on the following options:
  {{customizationOptions}}

  Based on the user\'s request, update the character description to reflect the desired behavior.
  The updated character description should be concise and clear.
  `,
});

const customizeCharacterFlow = ai.defineFlow(
  {
    name: 'customizeCharacterFlow',
    inputSchema: CustomizeCharacterInputSchema,
    outputSchema: CustomizeCharacterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

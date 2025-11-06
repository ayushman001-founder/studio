'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { customizeCharacter } from '@/ai/flows/character-customization';
import type { Character } from '@/lib/definitions';

const customizationSchema = z.object({
  options: z.string().min(10, { message: 'Please describe the changes in at least 10 characters.' }),
});

type CustomizationFormData = z.infer<typeof customizationSchema>;

interface CharacterCustomizationFormProps {
  character: Character;
  onCharacterUpdate: (updatedDescription: string) => void;
}

export function CharacterCustomizationForm({ character, onCharacterUpdate }: CharacterCustomizationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CustomizationFormData>({
    resolver: zodResolver(customizationSchema),
    defaultValues: {
      options: '',
    },
  });

  const onSubmit = async (data: CustomizationFormData) => {
    setIsLoading(true);
    try {
      const result = await customizeCharacter({
        characterDescription: character.characterDescription,
        customizationOptions: data.options,
      });
      onCharacterUpdate(result.updatedCharacterDescription);
      form.reset();
    } catch (error) {
      console.error('Character customization failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update the character. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-sm text-muted-foreground">
          <strong>Current Personality:</strong> {character.characterDescription}
        </p>
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customization Options</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 'Make them more humorous and less formal', 'I want them to be more inquisitive and ask more questions.'"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Apply Changes
        </Button>
      </form>
    </Form>
  );
}

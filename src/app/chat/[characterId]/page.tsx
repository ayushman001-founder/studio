'use client';

import { useParams, notFound } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, Loader2, Send, Settings, Bot, User, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from '@/lib/utils';
import { CHARACTERS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CharacterCustomizationForm } from '@/components/chat/character-customization';
import { aiChatInterface, AIChatInterfaceInput } from '@/ai/flows/ai-chat-interface';
import { useToast } from '@/hooks/use-toast';
import type { Character, UserProfile } from '@/lib/definitions';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

// A mock function to get user profile. In a real app, this would fetch from a database.
const MOCK_USER_PROFILE: UserProfile = {
  age: 25,
  gender: 'Female',
  language: 'Hinglish',
  country: 'India',
};

export default function ChatPage() {
  const params = useParams();
  const { toast } = useToast();
  const { characterId } = params;

  // Use useState and useEffect to avoid server/client mismatch for character data
  const [character, setCharacter] = useState<Character | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER_PROFILE);

  useEffect(() => {
    const foundCharacter = CHARACTERS.find((c) => c.id === characterId);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      notFound();
    }
    // In a real app, you would fetch the user's profile here.
    // For now, we use the mock profile.
    // You could also store it in a global state/context.
  }, [characterId]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !character) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiInput: AIChatInterfaceInput = {
        message: input,
        category: character.category,
        characterDescription: character.characterDescription,
        userProfile: {
          language: userProfile.language
        }
      };

      const result = await aiChatInterface(aiInput);
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: result.response,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI chat failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a response from the AI. Please try again.',
      });
      // Optionally remove the user message or add an error message to the chat
       setMessages((prev) => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteMessage = (messageId: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
  };

  const handleCharacterUpdate = (updatedDescription: string) => {
    if (character) {
      setCharacter({ ...character, characterDescription: updatedDescription });
      toast({
        title: 'Companion Updated',
        description: 'Your companion’s personality has been updated.',
      });
    }
  };

  if (!character) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const image = PlaceHolderImages.find((p) => p.id === character.imageId);

  return (
    <div className="flex h-svh flex-col">
      <header className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="md:hidden">
            <Link href="/characters">
              <ArrowLeft />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="hidden md:flex">
            <Link href="/characters">
              <ArrowLeft />
            </Link>
          </Button>
          <Avatar>
            <AvatarImage src={image?.imageUrl} alt={character.name} data-ai-hint={image?.imageHint} />
            <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{character.name}</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings />
              <span className="sr-only">Customize Character</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Customize {character.name}</SheetTitle>
              <SheetDescription>
                Fine-tune your companion&apos;s personality. Describe the changes you&apos;d like to see.
              </SheetDescription>
            </SheetHeader>
            <Separator className="my-4" />
            <CharacterCustomizationForm
              character={character}
              onCharacterUpdate={handleCharacterUpdate}
            />
          </SheetContent>
        </Sheet>
      </header>

      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {messages.map((message) => (
             <div
              key={message.id}
              className={cn(
                'flex items-end gap-3 group',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot size={20} /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs rounded-lg p-3 text-sm md:max-w-md',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.text}
              </div>
              {message.sender === 'user' && (
                 <div className="flex items-center gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete message</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your message.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteMessage(message.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><User size={20} /></AvatarFallback>
                    </Avatar>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3 justify-start">
               <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot size={20} /></AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg p-3 text-sm md:max-w-md bg-muted flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

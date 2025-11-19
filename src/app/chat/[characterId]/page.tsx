
'use client';

import { useParams, notFound } from 'next/navigation';
import React, { useMemo } from 'react';
import { Loader2 } from 'lucide-react';

import { CHARACTERS } from '@/lib/data';
import type { UserProfile } from '@/lib/definitions';
import { ChatInterface } from '@/components/chat/chat-interface';

// A mock function to get user profile. In a real app, this would fetch from a database.
const getMockUserProfile = (): UserProfile => ({
  age: 25,
  gender: 'Female',
  language: 'Hinglish',
  country: 'India',
});

export default function ChatPage() {
  const params = useParams();
  const { characterId } = params as { characterId: string };

  const character = useMemo(() => {
    const foundCharacter = CHARACTERS.find((c) => c.id === characterId);
    if (!foundCharacter) {
      notFound();
    }
    return foundCharacter;
  }, [characterId]);

  const userProfile = useMemo(() => getMockUserProfile(), []);

  if (!character || !userProfile) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <ChatInterface character={character} userProfile={userProfile} />;
}

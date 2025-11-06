import Image from 'next/image';
import Link from 'next/link';
import { Heart, Home, Users, Briefcase, MessageSquare } from 'lucide-react';
import { AppLayout } from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CATEGORIES, CHARACTERS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CharacterCategory } from '@/lib/definitions';

function getIconForCategory(category: CharacterCategory) {
  switch (category) {
    case 'Love':
      return <Heart className="mr-2 h-5 w-5" />;
    case 'Family':
      return <Home className="mr-2 h-5 w-5" />;
    case 'Friend':
      return <Users className="mr-2 h-5 w-5" />;
    case 'Business':
      return <Briefcase className="mr-2 h-5 w-5" />;
    default:
      return null;
  }
}

export default function CharactersPage() {
  const charactersByCategory = (category: CharacterCategory) => {
    return CHARACTERS.filter((character) => character.category === category);
  };

  const getImage = (imageId: string) => {
    const img = PlaceHolderImages.find((p) => p.id === imageId);
    return img || PlaceHolderImages[0];
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Choose Your Companion</h1>
          <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
            Select a character to start a conversation.
          </p>
        </div>
        <Tabs defaultValue={CATEGORIES[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mx-auto max-w-2xl mb-8">
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category} value={category} className="flex items-center">
                {getIconForCategory(category)}
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {charactersByCategory(category).map((character) => {
                  const image = getImage(character.imageId);
                  return (
                    <Card key={character.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                      <CardHeader className="p-0">
                        <div className="aspect-square relative">
                          <Image
                            src={image.imageUrl}
                            alt={character.name}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow p-6">
                        <CardTitle className="font-headline text-2xl">{character.name}</CardTitle>
                        <CardDescription className="mt-2 text-base">{character.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-primary hover:bg-primary/90">
                          <Link href={`/chat/${character.id}`}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Chat Now
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}

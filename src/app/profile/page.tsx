'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';

import { AppLayout } from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile } from '@/lib/definitions';

const profileFormSchema = z.object({
  age: z.coerce.number().min(13, { message: 'You must be at least 13 years old.' }).max(120),
  gender: z.enum(['Male', 'Female', 'Other'], {
    required_error: 'Please select a gender.',
  }),
  language: z.enum(['English', 'Hindi', 'Hinglish'], {
    required_error: 'Please select a language.',
  }),
  country: z.literal('India'),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Mock function to get user profile. In a real app, this would fetch from a database.
const getMockUserProfile = (): UserProfile => ({
  age: 25,
  gender: 'Female',
  language: 'Hinglish',
  country: 'India',
});


export default function ProfilePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      country: 'India',
    },
    mode: 'onChange',
  });
  
  useEffect(() => {
    // In a real app, you would fetch the user's profile from your backend
    const profile = getMockUserProfile();
    setUserProfile(profile);
    form.reset(profile);
  }, [form]);

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    // Mock save. In a real app, you'd save this to your database.
    console.log('Saving profile:', data);
    setTimeout(() => {
      setIsLoading(false);
      setUserProfile(data);
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been saved successfully.',
      });
    }, 1000);
  }

  return (
    <AppLayout>
      <div className="container mx-auto max-w-3xl py-12">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>This is how others will see you on the site.</CardDescription>
          </CardHeader>
          <CardContent>
             {userProfile ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Your age" {...field} />
                        </FormControl>
                        <FormDescription>Your age will be used to tailor content.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your preferred language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Hindi">Hindi</SelectItem>
                            <SelectItem value="Hinglish">Hinglish</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>This is the language you will be interacting in.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update profile
                  </Button>
                </form>
              </Form>
            ) : (
               <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin" />
               </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

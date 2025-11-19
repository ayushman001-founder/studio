export type CharacterCategory = 'Love' | 'Family' | 'Friend' | 'Business';

export type Character = {
  id: string;
  name: string;
  category: CharacterCategory;
  description: string;
  characterDescription: string;
  imageId: string;
  introMessage: string;
};

export type UserProfile = {
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  language?: 'English' | 'Hindi' | 'Hinglish';
  country?: 'India';
};

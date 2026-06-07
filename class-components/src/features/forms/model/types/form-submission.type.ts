export type FormSubmission = Readonly<{
  id: string;
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  imageBase64: string;
  agreedToTerms: true;
  submittedAt: number;
  isNew?: boolean;
}>;

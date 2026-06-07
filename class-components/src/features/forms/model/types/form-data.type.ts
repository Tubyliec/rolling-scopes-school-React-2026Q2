export type FormData = Readonly<{
  name: string;
  age: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  password: string;
  confirmPassword: string;
  country: string;
  image: FileList | null;
  agreedToTerms: boolean;
}>;

export interface Beneficiary {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contactInfo: {
    email: string;
    phone: string;
    address?: string;
  };
  budget: number;
  power: number;
  ratings: {
    totalScore: number;    
    numberOfRatings: number; 
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'Admin' | 'Beneficiary';
  password?: string; 
}

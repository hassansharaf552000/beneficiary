export interface PendingRequest {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'Beneficiary';
  requestDate: Date;
  status: 'pending' | 'approved' | 'rejected';
}

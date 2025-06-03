import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  ResponseOptions,
  STATUS
} from 'angular-in-memory-web-api';

import { User } from '../models/user.model';
import { Beneficiary } from '../models/beneficiary.model';
import { PendingRequest } from '../models/pending-request.model';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  private persistentUsers: User[] = [];
  private persistentBeneficiaries: Beneficiary[] = [];
  private persistentRatings: Array<{ id: number; raterId: string; targetId: string; score: number }> = [];
  private persistentPendingRequests: PendingRequest[] = [];
  private isInitialized = false;
  
  createDb() {
    console.log('InMemoryDataService: createDb() called - initializing database');
      if (!this.isInitialized) {
      this.persistentUsers = [
        { id: '1', username: 'admin', email: 'admin@example.com', role: 'Admin', password: 'admin123' },
        { id: '2', username: 'hassan', email: 'hassan@example.com', role: 'Beneficiary', password: 'hassan123' },
        { id: '3', username: 'hessin', email: 'hessin@example.com', role: 'Beneficiary', password: 'hessin123' },
        { id: '4', username: 'ahmed', email: 'ahmed@example.com', role: 'Beneficiary', password: 'ahmed123' },
        { id: '5', username: 'sara', email: 'sara@example.com', role: 'Beneficiary', password: 'sara123' },
        { id: '6', username: 'mohamed', email: 'mohamed@example.com', role: 'Beneficiary', password: 'mohamed123' },
        { id: '7', username: 'fatima', email: 'fatima@example.com', role: 'Beneficiary', password: 'fatima123' },
        { id: '8', username: 'ali', email: 'ali@example.com', role: 'Beneficiary', password: 'ali123' },
        { id: '9', username: 'nour', email: 'nour@example.com', role: 'Beneficiary', password: 'nour123' },
        { id: '10', username: 'omar', email: 'omar@example.com', role: 'Beneficiary', password: 'omar123' },
        { id: '11', username: 'layla', email: 'layla@example.com', role: 'Beneficiary', password: 'layla123' },
        { id: '12', username: 'khaled', email: 'khaled@example.com', role: 'Beneficiary', password: 'khaled123' },
        { id: '13', username: 'amina', email: 'amina@example.com', role: 'Beneficiary', password: 'amina123' },
        { id: '14', username: 'youssef', email: 'youssef@example.com', role: 'Beneficiary', password: 'youssef123' },
        { id: '15', username: 'maryam', email: 'maryam@example.com', role: 'Beneficiary', password: 'maryam123' },
        { id: '16', username: 'moderator', email: 'moderator@example.com', role: 'Admin', password: 'mod123' }
      ];

      this.persistentBeneficiaries = [
        {
          id: '2',
          name: 'hassan',
          age: 25,
          gender: 'Male',
          contactInfo: { email: 'hassan@example.com', phone: '01026951164' },
          budget: 5000,
          power: 100,
          ratings: { totalScore: 15, numberOfRatings: 3 }
        },
        {
          id: '3',
          name: 'hessin',
          age: 25,
          gender: 'Male',
          contactInfo: { email: 'hessin@example.com', phone: '01026951231' },
          budget: 5000,
          power: 100,
          ratings: { totalScore: 15, numberOfRatings: 5 }
        },
        {
          id: '4',
          name: 'ahmed',
          age: 28,
          gender: 'Male',
          contactInfo: { email: 'ahmed@example.com', phone: '01123456789' },
          budget: 4500,
          power: 85,
          ratings: { totalScore: 12, numberOfRatings: 3 }
        },
        {
          id: '5',
          name: 'sara',
          age: 23,
          gender: 'Female',
          contactInfo: { email: 'sara@example.com', phone: '01234567890' },
          budget: 3200,
          power: 75,
          ratings: { totalScore: 20, numberOfRatings: 4 }
        },
        {
          id: '6',
          name: 'mohamed',
          age: 30,
          gender: 'Male',
          contactInfo: { email: 'mohamed@example.com', phone: '01345678901' },
          budget: 6000,
          power: 120,
          ratings: { totalScore: 25, numberOfRatings: 5 }
        },
        {
          id: '7',
          name: 'fatima',
          age: 26,
          gender: 'Female',
          contactInfo: { email: 'fatima@example.com', phone: '01456789012' },
          budget: 3800,
          power: 90,
          ratings: { totalScore: 18, numberOfRatings: 4 }
        },
        {
          id: '8',
          name: 'ali',
          age: 24,
          gender: 'Male',
          contactInfo: { email: 'ali@example.com', phone: '01567890123' },
          budget: 2900,
          power: 65,
          ratings: { totalScore: 14, numberOfRatings: 2 }
        },
        {
          id: '9',
          name: 'nour',
          age: 22,
          gender: 'Female',
          contactInfo: { email: 'nour@example.com', phone: '01678901234' },
          budget: 2500,
          power: 60,
          ratings: { totalScore: 10, numberOfRatings: 2 }
        },
        {
          id: '10',
          name: 'omar',
          age: 29,
          gender: 'Male',
          contactInfo: { email: 'omar@example.com', phone: '01789012345' },
          budget: 5500,
          power: 110,
          ratings: { totalScore: 22, numberOfRatings: 4 }
        },
        {
          id: '11',
          name: 'layla',
          age: 27,
          gender: 'Female',
          contactInfo: { email: 'layla@example.com', phone: '01890123456' },
          budget: 4200,
          power: 95,
          ratings: { totalScore: 16, numberOfRatings: 4 }
        },
        {
          id: '12',
          name: 'khaled',
          age: 31,
          gender: 'Male',
          contactInfo: { email: 'khaled@example.com', phone: '01901234567' },
          budget: 7000,
          power: 140,
          ratings: { totalScore: 30, numberOfRatings: 6 }
        },
        {
          id: '13',
          name: 'amina',
          age: 25,
          gender: 'Female',
          contactInfo: { email: 'amina@example.com', phone: '01012345678' },
          budget: 3600,
          power: 80,
          ratings: { totalScore: 12, numberOfRatings: 3 }
        },
        {
          id: '14',
          name: 'youssef',
          age: 26,
          gender: 'Male',
          contactInfo: { email: 'youssef@example.com', phone: '01112345678' },
          budget: 4800,
          power: 105,
          ratings: { totalScore: 21, numberOfRatings: 3 }
        },
        {
          id: '15',
          name: 'maryam',
          age: 24,
          gender: 'Female',
          contactInfo: { email: 'maryam@example.com', phone: '01212345678' },
          budget: 3400,
          power: 70,
          ratings: { totalScore: 14, numberOfRatings: 2 }
        }
      ];this.persistentRatings = [];
      this.persistentPendingRequests = [];
      this.isInitialized = true;
      
      console.log('InMemoryDataService: First time initialization');
    }    console.log('InMemoryDataService: Returning data - users:', this.persistentUsers.length, 'beneficiaries:', this.persistentBeneficiaries.length);    return { 
      users: this.persistentUsers, 
      beneficiaries: this.persistentBeneficiaries, 
      ratings: this.persistentRatings,
      'pending-requests': this.persistentPendingRequests
    };
  }

  genId<T extends { id: any }>(collection: T[], collectionName: string): any {
    return collection.length > 0
      ? (Math.max(...collection.map(item => +item.id)) + 1).toString()
      : '1';
  }

post(requestInfo: any) {
  const { collectionName, req } = requestInfo;
  if (req.url.endsWith('/auth/login')) {
    const { username, password } = req['body'];
    
    console.log('Login attempt - Current users in database:', this.persistentUsers.length);
    console.log('Login attempt - Looking for username:', username);
    console.log('Login attempt - All usernames:', this.persistentUsers.map(u => u.username));
    
    const matching = this.persistentUsers.find((u) => u.username === username && u.password === password);
    
    if (matching) {
      console.log('Login successful for user:', matching.username);
      const userResponse = {
        id: matching.id,
        username: matching.username,
        email: matching.email,
        role: matching.role
      };
      
      const options: ResponseOptions = {
        body: {
          user: userResponse,
          token: 'FAKE_JWT_TOKEN'
        },
        status: STATUS.OK
      };
      return requestInfo.utils.createResponse$(() => options);
    } else {
      console.log('Login failed - No matching user found');
      const options: ResponseOptions = {
        status: STATUS.UNAUTHORIZED,
        body: { message: 'Invalid credentials' }
      };
      return requestInfo.utils.createResponse$(() => options);
    }
  }  if (req.url.endsWith('/api/users')) {    
    console.log('Registration request received:', req['body']);
    const { username, email, password, role, isAdminCreated } = req['body'];
    
    console.log('Current users count:', this.persistentUsers.length);
    
    const existingUser = this.persistentUsers.find(u => u.username === username || u.email === email);
    const existingPendingRequest = this.persistentPendingRequests.find(r => r.username === username || r.email === email);
    
    if (existingUser || existingPendingRequest) {
      console.log('User already exists or has pending request');
      const options: ResponseOptions = {
        status: STATUS.CONFLICT,
        body: { message: 'Username or email already exists or has a pending request' }
      };
      return requestInfo.utils.createResponse$(() => options);
    }

    if (isAdminCreated) {
      const newUser: User = {
        id: this.genId(this.persistentUsers, 'users'),
        username,
        email,
        role: role || 'Beneficiary',
        password
      };

      this.persistentUsers.push(newUser);
      console.log('New user created by admin:', newUser);

      if ((role || 'Beneficiary') === 'Beneficiary') {
        const newBeneficiary: Beneficiary = {
          id: newUser.id,
          name: username,
          age: 25,
          gender: 'Male',
          contactInfo: { email, phone: '' },
          budget: 1000,
          power: 50,
          ratings: { totalScore: 0, numberOfRatings: 0 }
        };
        this.persistentBeneficiaries.push(newBeneficiary);
        console.log('New beneficiary created by admin:', newBeneficiary);
      }

      const userResponse = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      };

      const options: ResponseOptions = {
        body: { user: userResponse, message: 'User created successfully' },
        status: STATUS.CREATED
      };
      return requestInfo.utils.createResponse$(() => options);
    } else {      
      const pendingRequest: PendingRequest = {
        id: this.genId(this.persistentPendingRequests, 'pending-requests'),
        username,
        email,
        password,
        role: role || 'Beneficiary',
        requestDate: new Date(),
        status: 'pending'
      };

      this.persistentPendingRequests.push(pendingRequest);
      console.log('New pending request created:', pendingRequest);

      const options: ResponseOptions = {
        body: { message: 'Registration request submitted. Please wait for admin approval.' },
        status: STATUS.CREATED
      };
      return requestInfo.utils.createResponse$(() => options);
    }
  }  if (
    collectionName === 'beneficiaries' &&
    req.url.match(/\/api\/beneficiaries\/\d+\/rate$/)
  ) {
    const urlParts = req.url.split('/');
    const targetId = urlParts[urlParts.length - 2];
    const { raterId, rating } = req['body'];

    console.log('Rating attempt:', { raterId, targetId, rating });

    const existingRating = this.persistentRatings.find(
      r => r.raterId === raterId && r.targetId === targetId
    );

    if (existingRating) {
      console.log('User already rated this beneficiary');
      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.CONFLICT,
        body: { message: 'You have already rated this beneficiary' }
      }));
    }

    const beneficiaries = this.persistentBeneficiaries;
    const target = beneficiaries.find((b) => b.id === targetId);
    
    if (target && raterId !== targetId) {
      this.persistentRatings.push({
        id: this.genId(this.persistentRatings, 'ratings'),
        raterId,
        targetId,
        score: +rating
      });

      target.ratings.totalScore += +rating;
      target.ratings.numberOfRatings += 1;

      console.log('Rating added successfully:', target.ratings);

      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.OK,
        body: { success: true, message: 'Rating submitted successfully' }
      }));
    } else {
      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.BAD_REQUEST,
        body: { message: 'Cannot rate yourself or beneficiary not found' }      }));
    }  
  }

  if (req.url.match(/\/api\/pending-requests\/\d+\/(approve|reject)$/)) {
    const urlParts = req.url.split('/');
    const requestId = urlParts[urlParts.length - 2];
    const action = urlParts[urlParts.length - 1];
    
    const pendingRequest = this.persistentPendingRequests.find(r => r.id === requestId);
    
    if (!pendingRequest) {
      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.NOT_FOUND,
        body: { message: 'Pending request not found' }
      }));
    }

    if (action === 'approve') {
      const newUser: User = {
        id: this.genId(this.persistentUsers, 'users'),
        username: pendingRequest.username,
        email: pendingRequest.email,
        role: pendingRequest.role,
        password: pendingRequest.password
      };

      this.persistentUsers.push(newUser);

      if (pendingRequest.role === 'Beneficiary') {
        const newBeneficiary: Beneficiary = {
          id: newUser.id,
          name: pendingRequest.username,
          age: 25,
          gender: 'Male',
          contactInfo: { email: pendingRequest.email, phone: '' },
          budget: 1000,
          power: 50,
          ratings: { totalScore: 0, numberOfRatings: 0 }
        };
        this.persistentBeneficiaries.push(newBeneficiary);
      }

      pendingRequest.status = 'approved';

      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.OK,
        body: { message: 'Request approved successfully', user: newUser }
      }));
    } else if (action === 'reject') {
      pendingRequest.status = 'rejected';
      
      return requestInfo.utils.createResponse$(() => ({
        status: STATUS.OK,
        body: { message: 'Request rejected successfully' }
      }));
    }
  }

  return undefined;
}

get(requestInfo: any) {
  const { collectionName, collection, req } = requestInfo;
  
  if (req.url.includes('/api/')) {
    console.log(`GET request to: ${req.url}`);
    console.log(`Collection name: ${collectionName}`);
    console.log(`Collection data:`, collection);
  }
  
  return undefined;
}

}

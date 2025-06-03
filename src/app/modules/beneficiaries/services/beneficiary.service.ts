import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from '../../../core/models/beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
private apiUrl = '/api/beneficiaries';

  constructor(private http: HttpClient) {}

  getAllBeneficiaries(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(this.apiUrl);
  }

  getBeneficiaryById(id: string): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${this.apiUrl}/${id}`);
  }

  createBeneficiary(payload: Partial<Beneficiary>): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(this.apiUrl, payload);
  }

  updateBeneficiary(
    id: string,
    payload: Partial<Beneficiary>
  ): Observable<Beneficiary> {
    return this.http.put<Beneficiary>(`${this.apiUrl}/${id}`, payload);
  }

  deleteBeneficiary(id: string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  rateBeneficiary(
    raterId: string,
    targetId: string,
    rating: number
  ): Observable<any> {
    return this.http.post(`/api/beneficiaries/${targetId}/rate`, {
      raterId,
      rating
    });
  }
  getUserRatingForBeneficiary(
    raterId: string,
    targetId: string
  ): Observable<number | null> {
   
    return new Observable((sub) => sub.next(null));
  }

  // Check if user can rate a beneficiary (not themselves, and hasn't rated before)
  canRateBeneficiary(raterId: string, targetId: string): boolean {
    return raterId !== targetId;
  }
}
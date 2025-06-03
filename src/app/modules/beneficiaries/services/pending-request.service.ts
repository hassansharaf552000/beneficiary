import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PendingRequest } from '../../../core/models/pending-request.model';

@Injectable({
  providedIn: 'root'
})
export class PendingRequestService {
  private apiUrl = '/api/pending-requests';

  constructor(private http: HttpClient) { }

  getPendingRequests(): Observable<PendingRequest[]> {
    return this.http.get<PendingRequest[]>(this.apiUrl);
  }

  approveRequest(requestId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${requestId}/approve`, {});
  }

  rejectRequest(requestId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${requestId}/reject`, {});
  }
}

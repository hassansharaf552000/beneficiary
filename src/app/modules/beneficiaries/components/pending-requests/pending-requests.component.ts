import { Component, OnInit } from '@angular/core';
import { PendingRequest } from '../../../../core/models/pending-request.model';
import { PendingRequestService } from '../../services/pending-request.service';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrl: './pending-requests.component.css'
})
export class PendingRequestsComponent implements OnInit {
  pendingRequests: PendingRequest[] = [];
  loading = false;
  processingRequests = new Set<string>(); 

  constructor(private pendingRequestService: PendingRequestService) { }

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  loadPendingRequests(): void {
    this.loading = true;
    this.pendingRequestService.getPendingRequests().subscribe({
      next: (requests) => {
        this.pendingRequests = requests.filter(r => r.status === 'pending');
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading pending requests:', error);
        this.loading = false;
      }
    });
  }
  approveRequest(requestId: string): void {
    this.processingRequests.add(requestId);
    this.pendingRequestService.approveRequest(requestId).subscribe({
      next: (response) => {
        console.log('Request approved:', response);
        this.processingRequests.delete(requestId);
        this.loadPendingRequests(); 
      },
      error: (error) => {
        console.error('Error approving request:', error);
        this.processingRequests.delete(requestId);
      }
    });
  }

  rejectRequest(requestId: string): void {
    this.processingRequests.add(requestId);
    this.pendingRequestService.rejectRequest(requestId).subscribe({
      next: (response) => {
        console.log('Request rejected:', response);
        this.processingRequests.delete(requestId);
        this.loadPendingRequests();
      },
      error: (error) => {
        console.error('Error rejecting request:', error);
        this.processingRequests.delete(requestId);
      }
    });
  }

  isProcessing(requestId: string): boolean {
    return this.processingRequests.has(requestId);
  }
}

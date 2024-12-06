import { Component, OnInit } from '@angular/core';
import { CurrencyResponse } from '../../../../models/currency.model';
import { CurrencyService } from '../../../../services/currency.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss',
})
export class RequestListComponent implements OnInit {
  requests: CurrencyResponse[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getAllRequests().subscribe({
      next: (data) => (this.requests = data),
      error: () => {
        this.requests = [];
        alert('Error while downloading data');
      },
    });
  }
}

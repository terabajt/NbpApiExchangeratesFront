import { Component } from '@angular/core';
import { CurrencyService } from '../../../../services/currency.service';
import { CurrencyRequest } from '../../../../models/currency.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss',
})
export class RequestFormComponent {
  currency = '';
  name = '';
  result: number | null = null;

  constructor(private currencyService: CurrencyService) {}

  submit() {
    const request: CurrencyRequest = {
      currency: this.currency,
      name: this.name,
    };
    this.currencyService.getCurrencyValue(request).subscribe({
      next: (response) => (this.result = response.value),
      error: () => alert('Currency not found or error occurred'),
    });
  }
}

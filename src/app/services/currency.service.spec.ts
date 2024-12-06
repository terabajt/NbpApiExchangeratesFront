import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';
import { CurrencyRequest, CurrencyResponse } from '../models/currency.model';
import { environment } from '../../environments/environment';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService],
    });

    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch currency value using POST', () => {
    const mockRequest: CurrencyRequest = { currency: 'USD', name: 'Dollar' };
    const mockResponse: CurrencyResponse = {
      currency: 'USD',
      name: 'Dollar',
      date: new Date(),
      value: 5.25,
    };

    service.getCurrencyValue(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service['BASE_URL']}/get-current-currency-value-command`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequest);

    req.flush(mockResponse);
  });
  it('should fetch all requests using GET', () => {
    const mockResponse: CurrencyResponse[] = [
      {
        currency: 'USD',
        name: 'Dollar',
        date: new Date('2023-01-01'),
        value: 5.25,
      },
      {
        currency: 'EUR',
        name: 'Euro',
        date: new Date('2023-01-02'),
        value: 4.75,
      },
    ];

    service.getAllRequests().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/requests`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
  it('should handle error for getCurrencyValue', () => {
    const mockRequest: CurrencyRequest = {
      currency: 'INVALID',
      name: 'InvalidCurrency',
    };

    service.getCurrencyValue(mockRequest).subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne(
      `${service['BASE_URL']}/get-current-currency-value-command`
    );
    req.flush('Currency not found', { status: 404, statusText: 'Not Found' });
  });
  it('should handle error for getAllRequests', () => {
    service.getAllRequests().subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne(`${service['BASE_URL']}/requests`);
    req.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
  it('should use BASE_URL from environment', () => {
    expect(service['BASE_URL']).toBe(environment.apiCurrenciesUrl);
  });
});

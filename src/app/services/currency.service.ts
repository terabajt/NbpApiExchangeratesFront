import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CurrencyRequest, CurrencyResponse } from '../models/currency.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CurrencyService {
    private BASE_URL = environment.apiCurrenciesUrl;

    constructor(private http: HttpClient) {}

    getCurrencyValue(request: CurrencyRequest): Observable<CurrencyResponse> {
        return this.http.post<CurrencyResponse>(
            `${this.BASE_URL}/get-current-currency-value-command`,
            request,
        );
    }

    getAllRequests(): Observable<CurrencyResponse[]> {
        return this.http.get<CurrencyResponse[]>(`${this.BASE_URL}/requests`);
    }
}

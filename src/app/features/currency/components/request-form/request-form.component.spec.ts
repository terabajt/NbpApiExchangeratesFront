import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestFormComponent } from './request-form.component';
import { CurrencyService } from '../../../../services/currency.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';

class MockCurrencyService {
  getCurrencyValue() {
    return of({ value: 5.25 });
  }
}

describe('RequestFormComponent', () => {
  let component: RequestFormComponent;
  let fixture: ComponentFixture<RequestFormComponent>;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestFormComponent, FormsModule, CommonModule],
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestFormComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input fields to the component properties', () => {
    const currencyInput = fixture.debugElement.query(
      By.css('input#currency')
    ).nativeElement;
    const nameInput = fixture.debugElement.query(
      By.css('input#name')
    ).nativeElement;

    currencyInput.value = 'USD';
    nameInput.value = 'Dollar';
    currencyInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.currency).toBe('USD');
    expect(component.name).toBe('Dollar');
  });

  it('should call submit and display result when form is submitted', () => {
    component.currency = 'USD';
    component.name = 'Dollar';
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    submitButton.click();
    fixture.detectChanges();

    const resultDiv = fixture.debugElement.query(
      By.css('.mt-4.bg-green-100')
    ).nativeElement;
    expect(resultDiv).toBeTruthy();
    expect(resultDiv.textContent).toContain('Result: 5.25');
  });

  it('should handle errors correctly', async () => {
    const alertSpy = spyOn(window, 'alert');
    spyOn(currencyService, 'getCurrencyValue').and.returnValue(
      throwError(() => new Error('Currency not found'))
    );
    component.currency = 'XYZ';
    component.name = 'InvalidCurrency';
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    submitButton.click();
    await fixture.whenStable();
    expect(alertSpy).toHaveBeenCalledWith(
      'Currency not found or error occurred'
    );
  });
});

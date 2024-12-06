import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestListComponent } from './request-list.component';
import { CurrencyService } from '../../../../services/currency.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

class MockCurrencyService {
    getAllRequests() {
        return of([
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
        ]);
    }
}

describe('RequestListComponent', () => {
    let component: RequestListComponent;
    let fixture: ComponentFixture<RequestListComponent>;
    let currencyService: CurrencyService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RequestListComponent, CommonModule],
            providers: [{ provide: CurrencyService, useClass: MockCurrencyService }],
        }).compileComponents();

        fixture = TestBed.createComponent(RequestListComponent);
        component = fixture.componentInstance;
        currencyService = TestBed.inject(CurrencyService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch and display requests on initialization', () => {
        expect(component.requests.length).toBe(2);
        const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
        expect(rows.length).toBe(2);

        const firstRowCells = rows[0].queryAll(By.css('td'));
        expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('USD');
        expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('Dollar');
        expect(firstRowCells[3].nativeElement.textContent.trim()).toBe('5.25');
    });

    it('should handle errors when fetching requests', () => {
        spyOn(currencyService, 'getAllRequests').and.returnValue(
            throwError(() => new Error('Error fetching data')),
        );
        const alertSpy = spyOn(window, 'alert');
        component.ngOnInit();
        fixture.detectChanges();
        expect(alertSpy).toHaveBeenCalledWith('Error while downloading data');
    });
    it('should display an empty table when no requests are available', () => {
        component.requests = [];
        fixture.detectChanges();
        const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
        expect(rows.length).toBe(0);
    });
    it('should format the date correctly in the table', () => {
        const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
        const dateCell = rows[0].query(By.css('td:nth-child(3)')).nativeElement;
        expect(dateCell.textContent.trim()).toBe('Jan 1, 2023');
    });
    it('should render multiple rows in the table', () => {
        const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
        expect(rows.length).toBe(2);
        const secondRowCells = rows[1].queryAll(By.css('td'));
        expect(secondRowCells[0].nativeElement.textContent.trim()).toBe('EUR');
        expect(secondRowCells[1].nativeElement.textContent.trim()).toBe('Euro');
        expect(secondRowCells[3].nativeElement.textContent.trim()).toBe('4.75');
    });
    it('should call ngOnInit to fetch data', () => {
        const ngOnInitSpy = spyOn(component, 'ngOnInit').and.callThrough();
        component.ngOnInit();
        fixture.detectChanges();
        expect(ngOnInitSpy).toHaveBeenCalled();
    });
});

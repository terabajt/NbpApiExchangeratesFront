import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from './app.routes';
import { RequestFormComponent } from './features/currency/components/request-form/request-form.component';
import { RequestListComponent } from './features/currency/components/request-list/request-list.component';
import { Component } from '@angular/core';

@Component({ template: '' })
class MockRequestFormComponent {}

@Component({ template: '' })
class MockRequestListComponent {}

describe('App Routes', () => {
    let router: Router;
    let location: Location;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [MockRequestFormComponent, MockRequestListComponent],
        }).compileComponents();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        router.initialNavigation();
    });

    it('should redirect "" to "/form"', async () => {
        await router.navigate(['']);
        expect(location.path()).toBe('/form');
    });

    it('should navigate to "/form" and load RequestFormComponent', async () => {
        await router.navigate(['/form']);
        expect(location.path()).toBe('/form');
    });

    it('should navigate to "/list" and load RequestListComponent', async () => {
        await router.navigate(['/list']);
        expect(location.path()).toBe('/list');
    });

    it('should not match undefined paths', async () => {
        const consoleSpy = spyOn(console, 'warn');
        try {
            await router.navigate(['/undefined']);
        } catch (e) {
            const error = e as Error;
            expect(error.message).toContain('Cannot match any routes');
        }
        expect(consoleSpy).not.toHaveBeenCalled();
    });
});

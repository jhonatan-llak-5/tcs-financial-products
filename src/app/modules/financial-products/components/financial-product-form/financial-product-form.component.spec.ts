import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FinancialProductFormComponent } from './financial-product-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { FinancialProductsService } from '../../services/financial-products.service';
import { AlertService } from '../../../../../_core/services/alert.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockActivatedRoute {
  params = of({ id: null });
}

class MockFinancialProductsService {
  getById = jasmine.createSpy().and.returnValue(of({
    id: 'tsc001',
    name: 'Tarjeta de Crédito TCS',
    description: 'Una tarjeta de crédito con beneficios exclusivos',
    logo: 'logo.png',
    date_release: '2025-06-03',
    date_revision: '2026-06-03'
  }));

  checkId = jasmine.createSpy().and.returnValue(of(false));
  saveAsync = jasmine.createSpy().and.returnValue(of(true));
  updateAsync = jasmine.createSpy().and.returnValue(of(true));
}

class MockAlertService {
  setAlertMessage = jasmine.createSpy();
  setShowSuccessAlert = jasmine.createSpy();
}

describe('FinancialProductFormComponent', () => {
  let component: FinancialProductFormComponent;
  let fixture: ComponentFixture<FinancialProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductFormComponent],
      providers: [
        FormBuilder,
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: FinancialProductsService, useClass: MockFinancialProductsService },
        { provide: AlertService, useClass: MockAlertService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.get('id')).toBeTruthy();
    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('description')).toBeTruthy();
    expect(component.form.get('logo')).toBeTruthy();
    expect(component.form.get('date_release')).toBeTruthy();
    expect(component.form.get('date_revision')).toBeTruthy();
  });

  it('should update date_revision when date_release changes', () => {
    const releaseDate = '2024-06-03';
    const expectedRevisionDate = '2025-06-03';

    component.form.get('date_release')?.setValue(releaseDate);
    fixture.detectChanges();

    expect(component.form.get('date_revision')?.value).toBe(expectedRevisionDate);
  });

  it('should call getById if id param exists', () => {
    const service = TestBed.inject(FinancialProductsService);
    const route = TestBed.inject(ActivatedRoute);

    (route as any).params = of({ id: 'prod1' });
    component.ngOnInit();

    expect(service.getById).toHaveBeenCalledWith('prod1');
  });

  it('should submit form and call saveAsync when no currentId', fakeAsync(() => {
    component.form.setValue({
      id: 'newprod',
      name: 'Producto nuevo',
      description: 'Una descripción larga',
      logo: 'logo.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    });
    component.onSubmit();
    tick();

    const service = TestBed.inject(FinancialProductsService);
    expect(service.saveAsync).toHaveBeenCalled();
  }));

  it('should submit form and call updateAsync when currentId exists', fakeAsync(() => {
    component.currentId = 'prod1';
    component.form.setValue({
      id: 'prod1',
      name: 'Producto editado',
      description: 'Descripción editada',
      logo: 'logo.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    });
    component.onSubmit();
    tick();

    const service = TestBed.inject(FinancialProductsService);
    expect(service.updateAsync).toHaveBeenCalledWith('prod1', jasmine.anything());
  }));
});

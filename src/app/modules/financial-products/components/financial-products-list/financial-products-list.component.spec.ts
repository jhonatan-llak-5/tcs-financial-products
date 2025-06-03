import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialProductsListComponent } from './financial-products-list.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FinancialProductsService } from '../../services/financial-products.service';
import { AlertService } from '../../../../../_core/services/alert.service';
import { IFinancialProduct } from '../../interfaces/financial-products.interface';
import { table } from '../../config/table';

describe('FinancialProductsListComponent', () => {
  let component: FinancialProductsListComponent;
  let fixture: ComponentFixture<FinancialProductsListComponent>;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };
  let mockFinancialProductsSvc = {
    getAllAsync: jasmine.createSpy('getAllAsync'),
    deleteAsync: jasmine.createSpy('deleteAsync'),
  };
  let mockAlertSvc = {
    setAlertMessage: jasmine.createSpy('setAlertMessage'),
    setShowSuccessAlert: jasmine.createSpy('setShowSuccessAlert'),
  };

  const fakeProducts: IFinancialProduct[] = table.data;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsListComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FinancialProductsService, useValue: mockFinancialProductsSvc },
        { provide: AlertService, useValue: mockAlertSvc },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialProductsListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    mockFinancialProductsSvc.getAllAsync.and.returnValue(of({ data: fakeProducts }));
    component.ngOnInit();
    expect(component.loadingData).toBe(false);
    expect(component.data.length).toBe(20);
  });

  it('should call navigate on editRow', () => {
    const row: IFinancialProduct = fakeProducts[0];
    component.editRow(row);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/financial-products/', row.id]);
  });

  it('should call navigate on addRow', () => {
    component.addRow();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/financial-products/add']);
  });

  it('should open modal and select row on deleteRow', () => {
    const row = fakeProducts[0];
    component.deleteRow(row);
    expect(component.selectedRow).toEqual(row);
    expect(component.showModal).toBe(true);
  });

  it('should reset selectedRow and hide modal on cancelAction', () => {
    component.selectedRow = fakeProducts[0];
    component.showModal = true;
    component.cancelAction();
    expect(component.selectedRow).toBeNull();
    expect(component.showModal).toBe(false);
  });

  it('should call deleteAsync and reload data on confirmAction', () => {
    mockFinancialProductsSvc.deleteAsync.and.returnValue(of({}));
    mockFinancialProductsSvc.getAllAsync.and.returnValue(of({ data: [] }));

    component.selectedRow = fakeProducts[0];
    component.confirmAction();

    expect(mockFinancialProductsSvc.deleteAsync).toHaveBeenCalledWith('tsc-001');
    expect(mockAlertSvc.setAlertMessage).toHaveBeenCalledWith('Producto financiero eliminado correctamente');
    expect(mockAlertSvc.setShowSuccessAlert).toHaveBeenCalledWith(true);
  });
});

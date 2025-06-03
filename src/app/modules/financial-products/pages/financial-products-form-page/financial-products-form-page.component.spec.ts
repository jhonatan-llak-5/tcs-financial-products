import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductsFormPageComponent } from './financial-products-form-page.component';

describe('FinancialProductsFormPageComponent', () => {
  let component: FinancialProductsFormPageComponent;
  let fixture: ComponentFixture<FinancialProductsFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialProductsFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

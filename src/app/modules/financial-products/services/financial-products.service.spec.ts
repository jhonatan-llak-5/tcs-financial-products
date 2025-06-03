import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FinancialProductsService } from './financial-products.service';

describe('FinancialProductsService', () => {
  let service: FinancialProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialProductsService]
    });
    service = TestBed.inject(FinancialProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have baseUrl set to "products"', () => {
    expect(service.baseUrl).toBe('products');
  });

  it('should call checkId and return boolean observable', () => {
    const testId = 'tsc-001';
    const mockResponse = true;

    service.checkId(testId).subscribe((res) => {
      expect(res).toBeTrue();
    });

    const expectedUrl = service.handleUrl() + '/verification/'+testId;
    const req = httpMock.expectOne(expectedUrl);

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});

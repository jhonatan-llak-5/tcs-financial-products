import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get alert message', () => {
    service.setAlertMessage('Test message');
    expect(service.getAlertMessage()).toBe('Test message');
  });

  it('should set and get showSuccessAlert synchronously', () => {
    service.setShowSuccessAlert(true);
    expect(service.getShowSuccessAlert()).toBe(true);
    service.setShowSuccessAlert(false);
    expect(service.getShowSuccessAlert()).toBe(false);
  });

  it('should emit showSuccessAlert as observable', (done) => {
    service.handleShowSuccessAlert().subscribe(value => {
      expect(typeof value).toBe('boolean');
      done();
    });
  });

  it('should automatically set showSuccessAlert to false after 2 seconds when set to true', fakeAsync(() => {
    service.setShowSuccessAlert(true);
    expect(service.getShowSuccessAlert()).toBe(true);

    tick(2000);  // Avanza 2 segundos en el reloj simulado

    expect(service.getShowSuccessAlert()).toBe(false);
  }));
});

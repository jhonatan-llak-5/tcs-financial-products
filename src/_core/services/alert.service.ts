import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  showSuccessAlert = new BehaviorSubject<boolean>(false);
  alertMessage = new BehaviorSubject<string>('');

  constructor() { }

  setShowSuccessAlert(value: boolean) {
    this.showSuccessAlert.next(value);

    if(value) {
      timer(2000).subscribe(() => {
        this.showSuccessAlert.next(false);
      });
    }
  }

  setAlertMessage(message: string) {
    this.alertMessage.next(message);
  } 

  getAlertMessage() {
    return this.alertMessage.value;
  }

  getShowSuccessAlert() {
    return this.showSuccessAlert.value;
  }

  handleShowSuccessAlert() {
    return this.showSuccessAlert.asObservable();
  }

}

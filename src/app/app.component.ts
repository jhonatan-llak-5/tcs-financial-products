import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FloatingAlertComponent } from "../_core/components/alerts/floating-alert/floating-alert.component";
import { CommonModule } from '@angular/common';
import { AlertService } from '../_core/services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FloatingAlertComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  showSuccessAlert = false;
  alertMessage = '';
  subscription = new Subscription();

  constructor(
    private _alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    const alertSubs = this._alertSvc.handleShowSuccessAlert().subscribe({
      next: (value) => {
        this.showSuccessAlert = value;
        this.alertMessage = this._alertSvc.getAlertMessage();
      }
    });

    this.subscription.add(alertSubs);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

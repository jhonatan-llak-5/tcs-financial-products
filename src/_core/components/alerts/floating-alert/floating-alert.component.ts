import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-floating-alert',
  imports: [],
  templateUrl: './floating-alert.component.html',
  styleUrl: './floating-alert.component.scss'
})
export class FloatingAlertComponent implements OnInit {

  message: string = '';

  constructor(
    private _alertSvc: AlertService
  ) {}

  ngOnInit(): void {
    this.message = this._alertSvc.getAlertMessage();
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertMessage } from 'src/app/Model/AlertMessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loaderStatus: boolean;
  private loginForm: any;
  error = false;
  public alerts: Array<AlertMessage> = [];
  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.loaderStatus = false;
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }
  login(): void {
    this.loaderStatus = true;
    this.apiService.login(this.loginForm.value).
      subscribe(res => {
        if (res.status == "200" && res.userType == "CUSTOMER") {
          this.apiService.storeToken(res.authToken, "customer");
          this.router.navigate(['/home']);
          this.error = false;
        } else if (res.status == "200" && res.userType == "ADMIN") {
          this.apiService.storeToken(res.authToken, "admin");
          this.router.navigate(['/admin']);
          this.error = false;
        }
      },
        err => {
          this.loaderStatus = false;
          this.configAlertMessage("danger", "Wrong Username or password, Please try again !!!", 6000);

      });
  }

  private configAlertMessage(messageType: string, message: string, timeout: number) {

    // Remove previous message ,If exists.
    if (this.alerts != null) {
      this.alerts = this.alerts.filter(function (el) {
        return el.message !== message;
      });
    }

    const alertMessage: AlertMessage = new AlertMessage();
    alertMessage.type = messageType;
    alertMessage.message = message;
    alertMessage.dismissOnTimeout = timeout;
    this.alerts.push(alertMessage);

  }
}

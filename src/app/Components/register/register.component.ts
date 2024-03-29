import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/Model/AlertMessage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: any;
  public alerts: Array<AlertMessage> = [];
  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      username: '',
      age: '',
      usertype: 'customer'
    });
  }
  register(): void {

    this.apiService.register(this.registerForm.value).
      subscribe(res => {
        if (res.status == "400") {
          console.log("Details cannot be empty");
          this.configAlertMessage("danger", res.message, 8000);
        } else {
          this.router.navigate(['/login']);
        }
      },
        err => {
          this.configAlertMessage("danger", "An error has occured, Please try again !!!", 6000);
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


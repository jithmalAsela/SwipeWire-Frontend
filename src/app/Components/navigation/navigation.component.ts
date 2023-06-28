import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/Model/AlertMessage';
import { Product } from 'src/app/Model/product';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private loggedType: string;
  public alerts: Array<AlertMessage> = [];
  products: Product[] = [];
  private searchForm: any;
  isSearchByName: boolean = false;
  loaderStatus: boolean;
  
  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }
  createForm() {
    this.searchForm = this.formBuilder.group({
      productName: ''
    });
  }

  constructor(private auth: ApiService, private route: Router,private formBuilder: FormBuilder) {
    this.createForm();

    if (this.auth.getAuthType() == null) {
      this.loggedType = "home";
    } else {
      if (this.auth.getAuthType() == "customer") {
        this.loggedType = "customer";
      } else if (this.auth.getAuthType() == "admin") {
        this.loggedType = "admin";
      }
    }
  }

  ngOnInit() {
    //console.log(this.auth.getAuthType());
    this.loaderStatus = false;
  }
  logout() {
    this.loaderStatus = true;
    this.loggedType = "home";
    this.auth.removeToken();
    this.auth.logout();
    this.route.navigate(['/login']);
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

  searchByProductName(){
    if (this.auth.isAuthenticated) {
      this.products = null;
      this.isSearchByName= true;
      console.log("search product :"+this.searchForm.value)
      this.auth.getProductsByName('toy').subscribe(
        res => {
          this.products = res.oblist;
          this.isSearchByName= true;
        }
      );
  }
}
}

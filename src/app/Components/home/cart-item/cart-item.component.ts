import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Cart } from 'src/app/Model/cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Address } from 'src/app/Model/address';
import { AlertMessage } from 'src/app/Model/AlertMessage';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  isCheckout: boolean = false;
  loaderStatus: boolean;
  private auth: string;
  cartlist: Cart[];
  totalSum: number = 0;
  public alerts: Array<AlertMessage> = [];
  model: Address = {
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phonenumber: ''

  };
  constructor(private api: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.loaderStatus = true;
    this.api.getCartItems().subscribe(res => {
      this.cartlist = res.oblist;
      this.loaderStatus = false;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
        
      });
    });
    this.loaderStatus = false;
    this.api.getAddress().subscribe(res => {
      if (res.map != null) {
        this.model = res.map;
        if(res.status == 200){
          this.isCheckout = true;
        } else{
          this.configAlertMessage("danger", "please insert address", 8000);
        }

      }
    }, err => {
      this.loaderStatus = false;
      console.log(err);
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

  updateCart(id:any, quantity:any) {
    this.loaderStatus = true;
    this.cartlist  = null;
    this.api.updateCartItem(id.value, quantity.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
        this.loaderStatus = false;
      });
    });
  }
  deleteItem(id:any) {
    this.loaderStatus = true;
    this.api.deleteCartItem(id.value).subscribe(res => {
      this.cartlist = res.oblist;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
        this.loaderStatus = false;
      });
    });
  }

  placeOrder() {
    this.loaderStatus = true;
    this.api.placeOrder().subscribe(res => {
      if(res.status == 200){
      this.configAlertMessage("success", "Order added successfully", 8000);
      }
      this.api.getCartItems().subscribe(res => {
        this.cartlist = res.oblist;
        this.loaderStatus = false;
        this.cartlist.forEach(value => {
          this.totalSum = this.totalSum + (value.quantity * value.price);
          
        });
      });
      this.loaderStatus = false;
    });
    // this.route.navigate(['/home']);
  }

}

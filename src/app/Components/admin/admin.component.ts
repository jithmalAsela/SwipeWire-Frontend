import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';
import { ProductCategory } from 'src/app/Model/ProductCategory';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AlertMessage } from 'src/app/Model/AlertMessage';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  productCategory: ProductCategory[] = [];
  public alerts: Array<AlertMessage> = [];
  fileToUpload: File = null;
  showAdd = false;
  auth: string;
  prod: string;
  prodCategoryID: String = "";
  constructor(private api: ApiService, private router: Router) { }
  imageUrl: string = "/assets/img/noimage.png";
  ngOnInit() {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts().subscribe(
        res => {
          this.products = res.oblist;
        }
      );
      this.api.getProductsCategory().subscribe(
        res => {
          this.productCategory = res.oblist;
        }
      );
    }
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  show() {
    this.showAdd = true;
  }
  hide() {
    this.showAdd = false;
  }
  addProd(desc:any, quan:any, price:any, prodname:any, image:any, prodCategoryID:any) {
    console.log("prodCategoryID"+this.prodCategoryID+" any "+prodCategoryID.value);
    this.api.addProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload ,prodCategoryID.value).subscribe(res => {
      this.products = res.oblist;
    });
  }
  delProd(prodid:any) {

    this.api.deleteProduct(prodid.value).subscribe(res => {
      this.products = res.oblist;
      this.ngOnInit();
    });
    
  }
  edit(prodid:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "user": prodid.value
      }
    };
    this.router.navigate(["admin/edit"], navigationExtras);
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

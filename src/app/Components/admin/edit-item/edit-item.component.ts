import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ApiService } from 'src/app/Service/api.service';
import { AlertMessage } from 'src/app/Model/AlertMessage';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  public alerts: Array<AlertMessage> = [];
  product: Product = {
    productid: 0,
    description: '',
    price: 0,
    productname: '',
    quantity: 0,
    productimage: null
  };
  products: Product[] = [];
  fileToUpload: File = null;
  auth: string;
  prodid: string;
  imageUrl: string = "/assets/img/noimage.png";

  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }

  constructor(private route: ActivatedRoute, private api: ApiService) {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts().subscribe(
        res => {
          res.oblist.forEach(pro => {
            if (pro.productid == this.prodid) {
              this.product = pro;
              this.fileToUpload = pro.productimage;
            }
          });
        }
      );
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.prodid = params["user"];
    });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  updateProd(desc:any, quan:any, price:any, prodname:any, image:any) {
    console.log(this.product.productid)
    this.api.updateProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload, this.product.productid).subscribe(res => {
      // console.log(res);
      if(res.status == 200){
        this.configAlertMessage("success", "Update Successfully", 8000);
      }
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

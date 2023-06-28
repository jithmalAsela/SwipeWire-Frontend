import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  isTracking: boolean = false;
  auth: string;
  orderlist: any[] = [];
  constructor(private route: Router, private api: ApiService) { }

  ngOnInit() {
    this.auth = this.api.getToken();
    this.getOrderList();
  }

  getTrackingDet(){
    this.isTracking = true;
  }

  getOrderList() {
    this.api.getOrdersByUser().subscribe(res => {
      this.orderlist = res.orderlist;
      this.isTracking = true;
    });
  }

}

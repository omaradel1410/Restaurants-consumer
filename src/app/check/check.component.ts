import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})

export class CheckComponent implements OnInit {

  product: any;
  orderId: number = 0;
  itemCount: number = 0;

  constructor(public _RestaurantsService: RestaurantsService, public _Router: Router) {

    this.product = this._RestaurantsService.data
    this.orderId = this._RestaurantsService.orderId
    this.itemCount = this._RestaurantsService.itemCount;
  }

  resOrder: any;

  orderDetails() {
    this._RestaurantsService.orderDetail(this.orderId).subscribe(res => {

      console.log(res);

      if (res.isSuccess == true && this.itemCount > 0) {
        this.resOrder = res
        this._RestaurantsService.resOrder = this.resOrder;
        this._Router.navigate(['/orderdetails']);
      }
      else {
        this._Router.navigate(['/menu']);

      }
    })
  }



  deleteItem(item: any) {

    item.reset();
  }


  ngOnInit(): void {
  }

}

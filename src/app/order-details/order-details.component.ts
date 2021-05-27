import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  data: any;
  tableNumber: number = 0;
  itemInfo: any;
  list: any;

  constructor(public _RestaurantsService: RestaurantsService) {

    this.data = this._RestaurantsService.resOrder;
    this.tableNumber = this._RestaurantsService.tableNumber;
    this.itemInfo = this.data.data.items;


    for (let i = 0; i < this.itemInfo.length; i++) {
      this.list = this.itemInfo[i];
    }
  }





  ngOnInit(): void {
  }

}

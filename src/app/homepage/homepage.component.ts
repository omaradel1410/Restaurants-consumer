import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  tableNumber: number = 0;

  constructor(public _RestaurantsService: RestaurantsService, public _Router: Router) { }

  table = new FormGroup({
    tableNumber: new FormControl(null, Validators.required)
  })


  getFormData(data: any) {

    if (data.valid) {

      this.tableNumber = data.controls.tableNumber.value;
      this._RestaurantsService.tableNumber = this.tableNumber;
      this._Router.navigate(['/menu']);
    }
  }


  ngOnInit(): void {
  }

}

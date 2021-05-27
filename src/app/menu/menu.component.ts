import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  category: any;
  items: any;
  idItem: any;
  idCategory: any;
  menuItem: any;
  categoryOne: any;
  isChange: boolean = true;
  one: string = ''; // first name of category

  constructor(
    public _RestaurantsService: RestaurantsService,
    public _Router: Router
  ) {
    this._RestaurantsService.getAllBranches().subscribe(
      (res) => {
        this.category = res.data.categories;
        this.categoryOne = this.category[0].items;
        this.one = this.category[0].name;
      },
      () => {}
    );

    this.btnAddItem(this);
  }

  name: String = ''; // name of category
  menu(id: any) {
    this.idCategory = id;

    for (let i = 0; i < this.category.length; i++) {
      if (this.idCategory == this.category[i].id) {
        this.menuItem = this.category[i].items;
        this.name = this.category[i].name;
        this.isChange = false;
      }
    }
  }

  list: any;
  quantity: number = 0;
  total: number = 0;
  itemcount: number = 0;
  orderId: number = 0;
  isSuccess: boolean = false;
  data: any;

  removeOne(item: any) {
    item.quantity--;
    if (item.quantity < 0) {
      item.quantity = 0;
    }
  }

  addOne(item: any) {
    item.quantity++;
    this.quantity = item.quantity;
  }

  //---------------------- add order  ---------------------------
  btnAddItem(list: any) {
    this.list = list;
    let quantity = this.list.quantity;
    this.total = quantity * this.list.price;
    this._RestaurantsService.data = list;

    let data = {
      tablename: 's15',
      branchId: 6,
      items: [
        {
          itemId: this.list.id,
          quantity: this.quantity,
        },
      ],
    };

    this.data = data;
  }

  addOrder() {
    this._RestaurantsService.newOrder(this.data).subscribe((res) => {
      if (res.isSuccess) {
        this.itemcount = res.data.itemCount;
        this.orderId = res.data.id;
        this._RestaurantsService.orderId = this.orderId;
        this._RestaurantsService.itemCount = this.itemcount;
        this.isSuccess = res.isSuccess;
      }
    });
  }

  //-------------------------- check order success --------------------
  check() {
    if (this.isSuccess && this.quantity > 0) {
      this._Router.navigate(['/check']);
    }
  }

  ngOnInit(): void {}
}

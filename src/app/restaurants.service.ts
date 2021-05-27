import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  baseUrl: string = 'https://rcapi.travotels.com/api/listmenu/';
  data: any
  orderId: number = 0
  tableNumber: number = 0;
  resOrder: any;
  itemCount: number = 0;

  constructor(public _HttpClient: HttpClient) {

  }



  getAllBranches(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}11/6`);
  }

  newOrder(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}order`, data);
  }

  orderDetail(id: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}order/${id}`);
  }


}

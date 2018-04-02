import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {Observable} from "rxjs/Observable";
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.css']
})
export class BillPageComponent implements OnInit, OnDestroy {
  sub1: ISubscription;
  sub2: ISubscription;

  currency;
  bill;
  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data)=>{
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true
    })
  }

  ngOnDestroy(){
    this.sub1.unsubscribe();
    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }

  onRefresh(){
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .subscribe((currency: any)=>{
        this.currency = currency;
        this.isLoaded = true
      })
  }
}

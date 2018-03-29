import {Component, Input, OnInit} from '@angular/core';
import {BillModule} from "../../shared/models/bill.module";

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.css']
})
export class BillCardComponent implements OnInit {
  @Input() bill: BillModule;
  @Input() currency: any;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    const {rates} = this.currency;
    console.log(rates);
    this.dollar = rates['USD'] * this.bill.value;
    this.euro = rates['NOK'] * this.bill.value
  }

}

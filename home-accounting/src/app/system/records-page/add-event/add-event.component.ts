import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CategoryModel} from "../../shared/models/category.model";
import {NgForm} from "@angular/forms";
import {EventModel} from "../../shared/models/event.model";
import * as moment from 'moment'
import {BillService} from "../../shared/services/bill.service";
import {EventsService} from "../../shared/services/events.service";
import {BillModel} from "../../shared/models/bill.model";
import {Message} from "../../../shared/models/message.model";
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit, OnDestroy {
  sub1: ISubscription;
  sub2: ISubscription;

  @Input() categories: CategoryModel[] = [];

  types = [
    {type: 'income', label:'income'},
    {type: 'outcome', label: 'outcome'}
    ];

  message: Message;

  constructor(private billService: BillService, private eventsService: EventsService ) { }

  ngOnInit() {
    this.message = new Message('danger', '')
  }

  private showMessage(text: string){
    this.message.text = text;
    window.setTimeout(()=> this.message.text = '', 5000)
  }

  onSubmit(form: NgForm){
    let {amount, description, category, type} = form.value;
    if(amount < 0){
      amount *= -1
    }
    let date = moment().format('DD.MM.YYYY HH:mm:ss');
    const event = new EventModel(type, amount, +category, date, description);
    this.sub1 = this.billService.getBill()
      .subscribe((bill: BillModel)=>{
        let value = 0;
        if( type === 'outcome'){
          if(amount > bill.value){
            this.showMessage('No money no honey');
            return;
          }else{
            value = bill.value - amount
          }
        }else{
          value = bill.value + amount;
        }

        this.sub2 = this.billService.updateBill({value, currency: bill.currency})
          .mergeMap(() => this. eventsService.addEvent(event))
          .subscribe(()=>{
            form.setValue({
              amount: 0,
              description: '',
              category: 1,
              type: 'outcome'
            })
          })
      })
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe()
  }
}

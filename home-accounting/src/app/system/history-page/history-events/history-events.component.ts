import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from "../../shared/models/category.model";
import {EventModel} from "../../shared/models/event.model";

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.css']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: CategoryModel[] = [];
  @Input() events: EventModel[] = [];
  searchValue = '';
  searchPlaceholder = 'Sum';
  searchField = 'amount';

  constructor() { }

  getEventClass(e: EventModel){
    return{
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    }
  }

  ngOnInit() {
    this.events.forEach((e)=>{
      e.catName = this.categories.find((c)=> c.id === e.category).name
    })
  }

  changeCriteria(field){
    const namesMap = {
      amount: 'Sum',
      date: 'Date',
      category: 'Category',
      type: 'Type'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }
}

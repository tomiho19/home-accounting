import {Component, Input, OnInit} from '@angular/core';
import {EventsService} from "../shared/services/events.service";
import {Observable} from "rxjs/Observable";
import {ISubscription} from "rxjs/Subscription";
import {CategoryModel} from "../shared/models/category.model";
import {CategoriesService} from "../shared/services/categories.service";
import {EventModel} from "../shared/models/event.model";
import * as moment from 'moment'

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  sub1 : ISubscription;
  sub2 : ISubscription;


  @Input() data;
  categories: CategoryModel[] = [];
  events: EventModel[] = [];
  chartData = [];
  isLoaded = false;
  isFilterVisible = true;
  filteredEvents = [];

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) { }

  ngOnInit() {
    Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [CategoryModel[], EventModel[]])=>{
      this.categories = data[0];
      this.events = data[1];
      this.calculateChartData();
      this.isLoaded = true;
      this.setOriginalEvents();
    })
  }

  ngOnDestroy(){
    if( this.sub1) this.sub1.unsubscribe();
    if( this.sub2) this.sub2.unsubscribe();
  }

  calculateChartData(){
    this.chartData = [];
    this.categories.forEach((cat) =>{
      const catEvent = this.events.filter((e)=> e.category === cat.id && e.type === 'outcome')
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e)=>{
          total += e.amount;
          return total
        }, 0)
      })
    })
  }

  private toggleFilterVisibility(dir: boolean){
    this.isFilterVisible = dir;
    console.log(this.isFilterVisible);
  }

  private setOriginalEvents(){
    this.filteredEvents = this.events.slice()
  }

  openFilter(){
    this.toggleFilterVisibility(true)
    console.log('here');
  }

  onFilterApply(filterData){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e)=>{
        return filterData.types.indexOf(e.type) !== -1
      })
      .filter((e)=>{
        return filterData.categories.indexOf(e.category.toString()) !== -1
      })
      .filter((e)=>{
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss')
        return momentDate.isBetween(startPeriod, endPeriod)
      })

    this.calculateChartData()
  }

  onFilterCancel(){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData()
  }
}

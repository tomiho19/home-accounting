import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BillModel} from "../shared/models/bill.model";
import {CategoryModel} from "../shared/models/category.model";
import {EventModel} from "../shared/models/event.model";
import {ISubscription} from "rxjs/Subscription";
import {BillService} from "../shared/services/bill.service";
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.css']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  sub1: ISubscription;

  isLoaded = false;
  bill: BillModel;
  categories: CategoryModel[] = [];
  events: EventModel[] = [];

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [BillModel, CategoryModel[], EventModel[]])=>{
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true
    })
  }

  getCategoryCost(category: CategoryModel){
    const categoryEvents = this.events.filter(e => e.category === category.id && e.type === 'outcome');
    return categoryEvents.reduce((total, e)=> total += e.amount
    , 0);
  }

  private getPercent(category: CategoryModel):number{
    const percent = (100 * this.getCategoryCost(category)) / category.capacity;
    return percent > 100 ? 100: percent;
  }

  getCategoryPercent(category: CategoryModel):string{
    return this.getPercent(category) + '%'
  }

  getCategoryClass(category: CategoryModel): string{
    const percent = this.getPercent(category);
    return percent < 60 ? 'success': percent >= 100 ? 'danger': 'warning'
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe()
  }
}

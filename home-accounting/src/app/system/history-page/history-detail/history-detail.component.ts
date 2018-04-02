import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventsService} from "../../shared/services/events.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {EventModel} from "../../shared/models/event.model";
import {CategoryModel} from "../../shared/models/category.model";
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit, OnDestroy{

  event: EventModel;
  category: CategoryModel;
  isLoaded = false;
  sub1: ISubscription;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.sub1 = this.route.params
      .mergeMap((params: Params)=> this.eventsService.getEventById(params['id']))
      .mergeMap((event)=>{
        this.event = event;
        return this.categoriesService.getCategoryById(event.category)
      })
      .subscribe((category)=>{
        this.category = category;
        this.isLoaded = true
      })
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe()
  }
}

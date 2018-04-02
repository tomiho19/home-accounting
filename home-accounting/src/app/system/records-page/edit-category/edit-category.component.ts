import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoryModel} from "../../shared/models/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {Message} from '../../../shared/models/message.model';
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  sub1: ISubscription;

  constructor(private categoriesService: CategoriesService) { }

  message: Message;

  @Input() categories: CategoryModel[] = [];
  @Output() onCategoryEdit = new EventEmitter<CategoryModel>();
  currentCategoryId = 1;
  currentCategory: CategoryModel;

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange()
  }

  onSubmit(form:NgForm){
    let {name, capacity} = form.value;
    if( capacity < 0 ){
      capacity *= -1
    }
    const category = new CategoryModel(name, capacity, +this.currentCategoryId);
    this.sub1 = this.categoriesService.updateCategory(category)
      .subscribe((category: CategoryModel)=>{
        this.onCategoryEdit.emit(category);
        this.message.text = 'Category was successful edited';
        window.setTimeout(() => this.message.text = '', 5000)
      })
  }

  onCategoryChange(){
    this.currentCategory = this.categories.find(el=> el.id === +this.currentCategoryId);
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe()
  }
}

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {CategoryModel} from "../../shared/models/category.model";
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy{

  sub1: ISubscription;

  @Output() onCategoryAdd = new EventEmitter<CategoryModel>();

  constructor(private categoriesService: CategoriesService) { }

  onSubmit(form: NgForm){
    let {name, capacity} = form.value;
    if(capacity < 0 ){
      capacity *= -1
    }
    const category = new CategoryModel(name, capacity);
    this.sub1 = this.categoriesService.addCategory(category)
      .subscribe((category: CategoryModel)=>{
        this.onCategoryAdd.emit(category);
        form.reset();
      })

  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe()
  }
}

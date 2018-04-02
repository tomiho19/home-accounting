import { Component, OnInit } from '@angular/core';
import {CategoryModel} from "../shared/models/category.model";
import {CategoriesService} from "../shared/services/categories.service";

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.css']
})
export class RecordsPageComponent implements OnInit {
  categories: CategoryModel[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories)=>{
        this.categories = categories;
        this.isLoaded = true
      })
  }

  newCategoryAdded(category: CategoryModel){
    this.categories.push(category)
  }

  categoryWasEdited(category){
    const index = this.categories.findIndex(el=>el.id === category.id);
    this.categories[index] = category
  }


}

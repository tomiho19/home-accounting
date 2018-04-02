import {BaseApi} from "../../../shared/core/base-api";
import {HttpClient} from "@angular/common/http";
import {CategoryModel} from "../models/category.model";
import {Injectable} from "@angular/core";

@Injectable()
export class CategoriesService extends BaseApi{
  constructor(public http: HttpClient){
    super(http)
  }

  addCategory(category: CategoryModel){
    return this.post('categories', category)
  }

  getCategories(){
    return this.get('categories')
  }

  updateCategory(category: CategoryModel){
    return this.put('categories/' + category.id, category)
  }

  getCategoryById(id){
    return this.get('categories/' + id)
  }
}

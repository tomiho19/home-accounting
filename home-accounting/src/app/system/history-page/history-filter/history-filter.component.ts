import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from "../../shared/models/category.model";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter();
  @Output() onFilterApply = new EventEmitter();
  @Input()  categories: CategoryModel[] = [];

  timePeriods = [
    {type: 'd', label: 'Day'},
    {type: 'w', label: 'Weak'},
    {type: 'M', label: 'Month'}
  ];
  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];
  types = [
    {type:'income', label: 'income'},
    {type:'outcome', label: 'outcome'}
  ];


  constructor() { }

  ngOnInit() {
  }

  private calculateInputParams(field: string, checked: boolean, value){
    if(checked){
      this[field].indexOf(value) === -1 ? this[field].push(value): null
    }else{
      this[field] = this[field].filter(i => i !== value)
    }
  }

  handleChangeType({checked, value}){
    this.calculateInputParams('selectedTypes', checked, value)
  }

  handleChangeCategory({checked, value}){
    this.calculateInputParams('selectedCategories', checked, value)
  }

  closeFilter(){
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod  = 'd';
    this.onFilterCancel.emit();
  }

  applyFilter(){
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    })
  }

}

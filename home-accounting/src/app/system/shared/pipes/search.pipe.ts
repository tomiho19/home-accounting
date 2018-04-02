import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'appSearch'
})
export class SearchPipe implements PipeTransform{
  transform(items: any, value: string, field: string){
    if(items.length === 0 || !value){
      return items
    }

    return items.filter((t) => {
      let i = t;
      if (!isNaN(i[field])){
        i[field] += '';
      }
      if(field === 'type'){
        i[field] = i[field] === 'income' ? 'income': 'outcome'
      }
      if(field === 'category'){
        i[field] = i['catName']
      }
      return i[field].toLowerCase().indexOf(value.toLowerCase()) !== -1
    });
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseApi} from "../../../shared/core/base-api";

@Injectable()
export class BillService extends BaseApi{

  constructor(public http: HttpClient){
    super(http)
  }

  getBill(){
    return this.get('bill')
  }

  getCurrency(base: string = 'UAH'){
    return this.http.get('http://api.fixer.io/latest?base' + base)
  }

}

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

export class BaseApi {

  private baseURL = 'http://localhost:3000/';
  constructor(public http: HttpClient){}

  private getURL(url:string = ''):string{
    return this.baseURL + url
  }

  public get(url: string = ''): Observable<any>{
    return this.http.get(this.getURL(url))
  }

  public post(url: string = '', data:any = {}): Observable<any>{
    return this.http.post(this.getURL(url), data)
  }

  public put(url: string = '', data:any = {}): Observable<any>{
    return this.http.put(this.getURL(url), data)
  }

}

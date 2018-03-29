import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/map';


@Injectable()
export class UsersService {
  constructor(private http: HttpClient){}

  getUserByEmail(email: string){
    return this.http.get('http://localhost:3000/users?email=' + email);
  }

}

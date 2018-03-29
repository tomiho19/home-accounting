import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.model";
import {BaseApi} from "../core/base-api";


@Injectable()
export class UsersService extends BaseApi{
  constructor(public http: HttpClient){
    super(http);
  }

  getUserByEmail(email: string){
    return this.get('users?email=' + email);
  }

  createNewUser(user: User){
    return this.post('users', user)
  }

}

import {BaseApi} from "../../../shared/core/base-api";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EventModel} from "../models/event.model";

@Injectable()
export class EventsService extends BaseApi{
  constructor(public http: HttpClient){
    super(http)
  }

  addEvent(event: EventModel){
    return this.post('events', event)
  }

  getEvents(){
    return this.get('events')
  }

  getEventById(id: string){
    return this.get('events/' + id)
  }
}

import {Component, OnInit} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html'
})
export class SystemComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}
  ngOnInit(){
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login'])
    }
  }

}

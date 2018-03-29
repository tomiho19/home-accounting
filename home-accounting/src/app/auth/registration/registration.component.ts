import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Message} from "../../shared/models/message.model";
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  message: Message = new Message('danger', '');
  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue]),
    })
  }

  onSubmit(){
    let dataForm = this.form.value;
    let user = new User(dataForm.email, dataForm.password, dataForm.name);
    this.usersService.createNewUser(user)
      .subscribe((user: User)=>{
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        })
      })
  }

  forbiddenEmails(control: FormControl): Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User)=>{
          if(user){
            resolve({
              forbiddenEmail: true
            })
          }else{
            resolve(null)
          }
        })
    })
  }
}

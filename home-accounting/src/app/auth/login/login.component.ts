import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Message} from "../../shared/models/message.model";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  data: User;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) { }

  private showMessage(type: string = 'danger', text: string){
    this.message = new Message(type, text);
    window.setTimeout(()=>{
      this.message.text = ''
    }, 3000)
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if(formData.email !== user[0].email || formData.password !== user[0].password){
          console.log(formData.email, user.email);
          console.log('here');
          this.showMessage('danger', 'Email or password is incorrect')
        }else{
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login();
          //this.router.navigate([''])
        }
      })
  }

}

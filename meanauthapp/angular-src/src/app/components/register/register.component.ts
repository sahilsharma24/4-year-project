import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {FlashMessagesService} from 'angular2-flash-messages'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String
  username:String
  email:String
  password:String

  constructor(
    private validateService:ValidateService,
    private flashMessagesService:FlashMessagesService,
    private authService :AuthService,
    private router:Router,
    ) { }

  ngOnInit() {
  }
  onRegisterSubmit()
  {
    const user={
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password
    }
    
    if(!this.validateService.validateRegister(user))
    {
      this.flashMessagesService.show("please fill all fields",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email))
    {
      this.flashMessagesService.show("please enter a valid email",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
         this.flashMessagesService.show(data.message,{cssClass:'alert-success',timeout:3000});
         this.router.navigate(['/login'])
      }
      else{
         this.flashMessagesService.show("Something went wrong",{cssClass:'alert-danger',timeout:3000});
      }
    })

  }
}

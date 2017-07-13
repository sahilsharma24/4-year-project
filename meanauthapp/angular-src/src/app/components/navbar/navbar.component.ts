import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from'@angular/router'
import {FlashMessagesService} from 'angular2-flash-messages'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashmessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

logoutUser(){
  this.authService.logoutUser();
  this.flashmessage.show(
    "Logout Successfull",
    {cssClass:'alert-success',timeout:3000});
    this.router.navigate(['/login']);
  return false;

     
}
}

import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {FlashMessagesService} from 'angular2-flash-messages'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  userDetails:any;
  constructor(
    private validateService:ValidateService,
    private flashMessagesService:FlashMessagesService,
    private authService:AuthService
    ) { }
  ngOnInit() {
  }

download(userDetails)
  {
  if(userDetails!=null){  
  this.authService.download(userDetails)
  .subscribe(data=>{
     console.log(data)
     //let blob = new Blob([Response._body], { type: 'application/pdf' });
      // if(data.success){
      //    this.flashMessagesService.show(data.message,{cssClass:'alert-success',timeout:3000});
      // }
      // else{
      //    this.flashMessagesService.show("Something went wrong",{cssClass:'alert-danger',timeout:3000});
      // }
  })
}
 else{
   this.flashMessagesService.show("please enter the details",{cssClass:'alert-danger',timeout:3000});
 } 
}

 onDetailSubmit(userDetails){
   this.userDetails=userDetails;
if(!this.validateService.validateDetails(userDetails))
    {
      this.flashMessagesService.show("please fill all the details",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
if(!this.validateService.validateAddress(userDetails.Address))
    {
      this.flashMessagesService.show("Address is not in proper format please fill it correctly",{cssClass:'alert-danger',timeout:4000});
      return false;
    }
  
  if(!this.validateService.validateEmail(userDetails.email))
  {
    this.flashMessagesService.show("Email is not in proper format",{cssClass:'alert-danger',timeout:4000});
      return false;
  }

  this.download(userDetails);
   //console.log(userDetails)
 }
}

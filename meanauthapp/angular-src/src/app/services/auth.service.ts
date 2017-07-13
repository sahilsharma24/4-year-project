import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {tokenNotExpired} from 'angular2-jwt'
import {ResponseContentType} from '@angular/http'
@Injectable()
export class AuthService {
  authToken:any;
  user:any;
  constructor(private http:Http) { }


loggedIn()
{
  return tokenNotExpired();
}

  registerUser(user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("https://localhost:3000/users/register",user,{headers:headers})
    .map(res=>res.json());  
  }

  authenticateUser(user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/users/authenticate",user,{headers:headers})
    .map(res =>res.json())  
}
download(userDetails)
{
  console.log("in download")
  let headers=new Headers();
    headers.append('Content-Type','application/pdf');
  return this.http.post("http://localhost:3000/pdf",userDetails,{responseType: ResponseContentType.ArrayBuffer})
                    .map(res => this.downloadFile(res))
}

 downloadFile(data){
        let blob = new Blob([data._body], { type: 'application/pdf' });
        console.log(blob);
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      }


getProfile(){
   let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    return this.http.get("http://localhost:3000/users/profile",
    {headers:headers})
    .map(res =>res.json()) 
}

loadToken(){
  const token=localStorage.getItem('id_token');
  this.authToken=token;
}
storeUserData(token,user){
  console.log("user is ",user)
  localStorage.setItem('id_token',token);
  localStorage.setItem('user',JSON.stringify(user));
  this.authToken=token;
  this.user=user;
}
logoutUser(){
  localStorage.clear();
 this.authToken=null; 
 this.user=null;
}
}
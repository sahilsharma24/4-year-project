import { Injectable } from '@angular/core';
@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name==undefined || user.email==undefined || user.username==undefined ||user.password==undefined)
     return false
    else
     return true;
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

validateDetails(user){
  console.log(user)
    if(user.name==undefined || user.email==undefined || user.Address==undefined
       || user.qualification.collage==undefined || user.qualification.twelve==undefined ||user.qualification.matric==undefined)
     return false
    else
     return true;
  }
isNumber (o) {
  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}


validateAddress(Address){
    const address = Address.split("/");
    if(!this.isNumber(address[0]) || address[1]==undefined || address[2]==undefined || address[3]==undefined || !this.isNumber(address[4]))
        return false;
    return true;
}
}

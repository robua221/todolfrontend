import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,OnDestroy {
isLoading=false
private authListenerSubs:Subscription;
  constructor(public authService:AuthService) {}
  ngOnInit() {
    this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.isLoading=isAuthenticated;
    })
  }

  onSignUp(form:NgForm){
if(form.invalid){
  return
}
this.isLoading=true
const auth:AuthData={
email:form.value.email,
password:form.value.password

}
  this.authService.createUser(auth)

}
ngOnDestroy(){
  this.authListenerSubs.unsubscribe()
}
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
isLoading=false
private authListenerSubs:Subscription;

constructor(public authService:AuthService) {}
ngOnInit() {
  this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
    this.isLoading=isAuthenticated;
  })
}
onLogin(form:NgForm){
console.log(form.value);
if(form.invalid){
  return
}
this.isLoading=true
const auth:AuthData={
email:form.value.email,
password:form.value.password
}
  this.authService.login(auth)

}
ngOnDestroy(){
  this.authListenerSubs.unsubscribe()
}
}

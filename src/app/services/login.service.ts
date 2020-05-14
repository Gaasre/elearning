import { Injectable } from '@angular/core';
import { NoTokenRequest } from './no_token_request.service';
import { TokenRequest } from './token_request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any;

  constructor(private noTokenRequest: NoTokenRequest, private tokenRequest: TokenRequest) { }

  Login(credentials) {
    console.log(credentials);
    return this.noTokenRequest.Post(credentials, 'login');
  }

  SignUp(credentials) {
    return this.noTokenRequest.Post(credentials, 'signup');
  }

  getUser() {
    return this.tokenRequest.Get('users');
  }

  getUserById(id) {
    return this.tokenRequest.Get('users/' + id);
  }

  updateUser(data) {
    return this.tokenRequest.Update(data, 'users');
  }

  isAuthenticated() {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }
}

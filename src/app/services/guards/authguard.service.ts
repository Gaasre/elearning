import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private loginService: LoginService) {
  }

  canActivate() {
    if (this.loginService.isAuthenticated()) {
        return true;
    }
    this._router.navigate(['/']);
    return false;
  }

}

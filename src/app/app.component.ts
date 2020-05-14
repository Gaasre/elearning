import { Component, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'elearning';

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private loginService: LoginService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    if (this.storage.get('token')) {
      this.loginService.getUser().toPromise().then((res: any) => {
        this.loginService.user = res;
      }).catch(err => {
        this.storage.remove('token');
        this.loginService.user = null;
      });
    }
  }
}


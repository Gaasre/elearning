import { Component, OnInit, Input, Inject } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() template: NzModalRef;
  loading = false;
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private messageService: NzMessageService, private fb: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLogin() {
    this.loading = true;
    setTimeout(() => {
      this.loginService.Login(this.loginForm.value).toPromise().then((res: any) => {
        this.loading = false;
        if (res.error) {
          this.messageService.error(res.error);
        } else {
          this.storage.set('token', res.token);
          this.loginService.getUser().toPromise().then((user: any) => {
            this.loginService.user = user;
            this.template.destroy();
          }).catch(ex => {
            console.log(ex);
            this.loading = false;
            this.messageService.error('Impossible de joindre le serveur');
          });
        }
      }).catch(ex => {
        console.log(ex);
        this.loading = false;
        this.messageService.error('Impossible de joindre le serveur');
      });
    }, 2000);
  }

}

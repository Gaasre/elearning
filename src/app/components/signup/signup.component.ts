import { Component, OnInit, Input, Inject } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Input() template: NzModalRef;
  loading = false;
  signupForm: FormGroup;
  constructor(private loginService: LoginService, private messageService: NzMessageService, private fb: FormBuilder,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      age: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitSignup() {
    this.loading = true;
    setTimeout(() => {
      this.loginService.SignUp(this.signupForm.value).toPromise().then((res: any) => {
        this.loading = false;
        if (res.error) {
          this.messageService.error(res.error);
        } else {
          this.storage.set('token', res.token);
          this.loginService.getUser().toPromise().then((user: any) => {
            this.messageService.success('Bienvenue à vous ' + user.name);
            this.loginService.user = user;
            this.template.destroy();
          }).catch(ex => {
            console.log(ex);
            this.loading = false;
            this.messageService.error('Impossible de joindre le serveur');
          });
        }
      }).catch(ex => {
        this.loading = false;
        this.messageService.error('Impossible de joindre le serveur');
      });
    }, 2000);
  }

}

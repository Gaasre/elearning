import { Component, OnInit, TemplateRef, Inject, Input } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { LoginService } from 'src/app/services/login.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  @Input() page;
  tplModal_Login: NzModalRef;
  tplModal_Signup: NzModalRef;
  loading = true;

  constructor(private modalService: NzModalService, private loginService: LoginService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) { }


    getTotal(course) {
      let total = 0;
      for (const categorie of course.content) {
        for (const element of categorie.elements) {
          total += 1;
        }
      }
      return total;
    }

  ngOnInit() {

  }

  openLogin(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>): void {
    this.tplModal_Login = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 380
    });
  }

  openSignup(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>): void {
    this.tplModal_Signup = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 380
    });
  }

  get userConnected() {
    return this.loginService.user;
  }

  Disconnect() {
    this.storage.remove('token');
    this.loginService.user = null;
    this.router.navigate(['/']);
  }

}

import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  hasUserChanged = false;
  user = {
    name: '',
    email: '',
    about: '',
    function: '',
    website: '',
    linkedin: '',
  };

  constructor(private userService: LoginService) { }

  ngOnInit() {
    this.userService.getUser().toPromise().then((res: any) => {
      this.user.name = res.name;
      this.user.email = res.email;
      this.user.about = res.about;
      this.user.function = res.function;
      this.user.website = res.website;
      this.user.linkedin = res.linkedin;
    });
  }

  onInputChange() {
    this.hasUserChanged = true;
  }

  updateUser() {
    this.userService.updateUser(this.user).toPromise().then(res => {
      this.hasUserChanged = false;
    });
  }

}

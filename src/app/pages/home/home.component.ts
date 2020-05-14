import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/courses.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories = [];

  constructor(private courseService: CourseService, private loginService: LoginService) { }

  ngOnInit() {
    this.courseService.getCategories().toPromise().then((res: any) => {
      this.categories = res;
    });
  }

  get isConnected() {
    if (this.loginService.user) {
      return true;
    } else {
      return false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/courses.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {

  course;
  isEnrolled = true;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private userService: LoginService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseService.getCourse(params.get('id')).toPromise().then((res: any) => {
        this.course = res;
        this.course['active'] = false;
        if (this.userService.user) {
          this.userService.getUser().toPromise().then((user: any) => {
            if (user.courses.find(x => x.course._id === this.course._id)) {
              this.isEnrolled = true;
            } else {
              this.isEnrolled = false;
            }
          });
        } else {
          this.isEnrolled = true;
        }
      });
    });
  }

  Enroll() {
    this.courseService.enroll(this.course._id).toPromise().then((res: any) => {
      console.log(res);
      this.userService.user.courses = [...this.userService.user.courses, {
        course: this.course,
        progression: []
      }];
      this.isEnrolled = true;
    });
  }

  isConnected() {
    if (this.userService.user) {
      return true;
    } else {
      return false;
    }
  }

}

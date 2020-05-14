import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  step = 0;
  courseType = 'Cours';
  courseTitle = '';
  courseCategory = '';

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit() {
  }

  canGoNext() {
    switch (this.step) {
      case 0:
        if (this.courseType !== '') {
          return true;
        } else {
          return false;
        }
      case 1:
        if (this.courseTitle !== '') {
          return true;
        } else {
          return false;
        }
      case 2:
        if (this.courseCategory !== '') {
          return true;
        } else {
          return false;
        }
    }
  }

  nextStep() {
    switch (this.step) {
      case 0:
        if (this.courseType !== '') {
          this.step = this.step + 1;
        }
        break;
      case 1:
        if (this.courseTitle !== '') {
          this.step = this.step + 1;
        }
        break;
      case 2:
        if (this.courseCategory !== '') {
          this.courseService.newCourse({
            name: this.courseTitle,
            category: this.courseCategory
          }).toPromise().then(res => {
            this.router.navigate(['/formateur']);
          });
        }
        break;
    }
  }

  previousStep() {
    this.step = this.step - 1;
  }

}

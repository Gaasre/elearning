import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  courseData = [];

  ngOnInit() {
    this.courseService.getByAuthor().toPromise().then((res: any) => {
      this.courseData = res;
    });
  }

  deleteCourse(courseid) {
    this.courseService.removeCourse(courseid).toPromise().then(req => {
      this.courseData = this.courseData.filter(x => x._id !== courseid);
    });
  }

}

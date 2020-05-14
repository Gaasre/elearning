import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/courses.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  course;
  author;
  total = 0;
  constructor(private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loginService.getUser().toPromise().then((user: any) => {
        this.course = user.courses.find(x => x.course._id === params.get('id'));
        console.log(this.course);
        for (const categorie of this.course.course.content) {
          for (const element of categorie.elements) {
            element['active'] = false;
            this.total += 1;
          }
        }
        this.loginService.getUserById(this.course.course.author).toPromise().then(author => {
          this.author = author;
        });
      });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/courses.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  progress = 0;
  course = {
    _id: '',
    name: '',
    short_desc: '',
    description: '',
    content: [],
    requirements: [],
    statut: false,
    currency: '',
    price: ''
  };
  selected = 'acceuil';
  newSection = false;
  newSectionName = '';
  newItemName = '';
  hasCourseChanged = false;
  newRequirement = false;
  newRequirementName = '';
  file;
  document;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseService.getCourse(params.get('id')).toPromise().then((res: any) => {
        this.course = res;
        this.course.content.forEach(x => {
          x.isEdit = false;
          x.newItem = false;
          x.elements.forEach(y => {
            y.isEdit = false;
            y.isExpanded = false;
            y.isDocExpanded = false;
            y.documents.forEach(element => {
              element.progress = 100;
            });
          });
        });
      });
    });
  }

  onFileChange(event, session, section) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      this.courseService.uploadSession(section._id, {
        video: this.file,
        name: session.name,
        id: session._id,
        duration: ''
      }).subscribe((res: any) => {
        if (res.video) {
          this.file = '';
          session.video = res.video;
        } else {
          this.progress = res.message;
        }
      });
    }
  }

  onDocumentChange(event, session, section) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.courseService.uploadDocument(section._id, session._id, file).subscribe((res: any) => {
        if (res._id) {
          session.documents.push({
            _id: res._id,
            name: res.name,
            done: res.done,
            progress: 100
          });
        } else {
          this.progress = res.message;
        }
      });
    }
  }

  deleteUpload(session, section) {
    this.courseService.deleteUpload(section._id, session._id).toPromise().then(res => {
      session.video = '';
      this.progress = 0;
    });
  }

  deleteDocument(session, section, document) {
    this.courseService.deleteDocument(section._id, session._id, document).toPromise().then(res => {
      session.documents = session.documents.filter(x => x._id !== document);
    });
  }

  addRequirement() {
    this.course.requirements = [...this.course.requirements, this.newRequirementName];
    this.hasCourseChanged = true;
    this.newRequirement = false;
    this.newRequirementName = '';
  }

  onInputChange() {
    this.hasCourseChanged = true;
  }

  updateCourse() {
    this.courseService.updateCourse({
      name: this.course.name,
      short_desc: this.course.short_desc,
      description: this.course.description,
      statut: this.course.statut,
      requirements: this.course.requirements,
      currency: this.course.currency,
      price: this.course.price
    }, this.course._id).toPromise().then(res => {
      this.hasCourseChanged = false;
    });
  }

  deleteSection(section) {
    this.courseService.removeSection(section._id).toPromise().then(res => {
      this.course.content = this.course.content.filter(x => x !== section);
    });
  }

  deleteItem(item, section) {
    this.courseService.removeSession(section._id, item._id).toPromise().then(res => {
      this.course.content.forEach(x => {
        x.elements = x.elements.filter(y => y !== item);
      });
    });
  }

  addSection() {
    this.courseService.newSection(this.course._id, this.newSectionName).toPromise().then((res: any) => {
      this.course.content = [...this.course.content, res];
      this.newSectionName = '';
      this.newSection = false;
    });
  }

  addItem(section) {
    this.courseService.newSession(this.course._id, section._id, this.newItemName).toPromise().then((res: any) => {
      console.log(res);
      res.isEdit = false;
      res.isExpanded = false;
      res.isDocExpanded = false;
      res.documents.forEach(element => {
        element.progress = 100;
      });
      section.elements = [...section.elements, res];
      this.newItemName = '';
      section.newItem = false;
    });
  }

  updateSection(section) {
    this.courseService.updateSection(section._id, { name: section.name }).toPromise().then(res => {
      section.isEdit = false;
    });
  }

  updateSession(session, section) {
    this.courseService.updateSession(section._id, session._id, { name: session.name }).toPromise().then(res => {
      session.isEdit = false;
    });
  }

}

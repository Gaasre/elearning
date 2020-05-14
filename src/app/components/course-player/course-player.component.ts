import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CourseService } from 'src/app/services/courses.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-course-player',
  templateUrl: './course-player.component.html',
  styleUrls: ['./course-player.component.css']
})
export class CoursePlayerComponent implements OnInit {

  @Input() courseTree;
  isPlaying = false;
  @ViewChild('video') videoplayer: ElementRef;
  currentTime = 0;
  isMuted = false;
  volume = 0.8;
  videoLink = '';

  constructor(private courseService: CourseService) { }

  selectElement(el) {
    for (const categorie of this.courseTree.course.content) {
      for (const element of categorie.elements) {
        element.active = false;
      }
    }
    el.active = true;
    this.videoLink = 'assets/' + el.video;
    this.videoplayer.nativeElement.load();
  }

  selectedElementId() {
    for (let i = 0; i < this.courseTree.course.content.length; i++) {
      for (let j = 0; j < this.courseTree.course.content[i].elements.length; j++) {
        if (this.courseTree.course.content[i].elements[j].active) {
          return (this.courseTree.course.content[i].elements.length * i) + j + 1;
        }
      }
    }
    return null;
  }

  goNext(selectedId) {
    for (let i = 0; i < this.courseTree.course.content.length; i++) {
      for (let j = 0; j < this.courseTree.course.content[i].elements.length; j++) {
        if (((this.courseTree.course.content[i].elements.length * i) + j + 1) === selectedId + 1) {
          this.selectElement(this.courseTree.course.content[i].elements[j]);
        }
      }
    }
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.courseTree.course.content.length; i++) {
      for (let j = 0; j < this.courseTree.course.content[i].elements.length; j++) {
        total += 1;
      }
    }
    return total;
  }

  ngOnInit() {
  }

  onTimeUpdate(event) {
    this.currentTime = event.target.currentTime;
    if (this.currentTime === this.videoplayer.nativeElement.duration) {
      this.isPlaying = false;
      const selectedid = this.selectedElementId();
      this.changeProgression(true, selectedid);
      if (this.getTotal() > selectedid) {
          this.goNext(selectedid);
          this.currentTime = 0;
      }
    }
  }

  isLoaded() {
    this.volume = this.videoplayer.nativeElement.volume;
  }

  onVolumeUpdate(event) {
    this.volume = event.target.volume;
  }

  volumeUpdate(event) {
    this.videoplayer.nativeElement.volume = event;
  }

  Mute() {
    this.videoplayer.nativeElement.muted = !this.videoplayer.nativeElement.muted;
    this.isMuted = !this.isMuted;
  }

  changeLocation(event) {
    this.videoplayer.nativeElement.currentTime = event;
  }

  fastForward() {
    if (this.videoplayer.nativeElement.currentTime + 5 <= this.videoplayer.nativeElement.duration) {
      this.videoplayer.nativeElement.currentTime += 5;
    } else {
      this.videoplayer.nativeElement.currentTime = this.videoplayer.nativeElement.duration;
    }
  }

  fastRewind() {
    if (this.videoplayer.nativeElement.currentTime - 5 >= 0) {
      this.videoplayer.nativeElement.currentTime -= 5;
    } else {
      this.videoplayer.nativeElement.currentTime = 0;
    }
  }

  saveFile(name) {
    saveAs('http://localhost:1234/assets/' + name, name);
  }

  Play() {
    if (this.isPlaying) {
      this.videoplayer.nativeElement.pause();
    } else {
      this.videoplayer.nativeElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  inProgression(val) {
    if (this.courseTree) {
      return this.courseTree.progression.includes(val);
    } else {
      return false;
    }
  }

  changeProgression(checked, index) {
    if (checked) {
      if (!this.courseTree.progression.includes(index)) {
        this.courseTree.progression = [...this.courseTree.progression, index];
        this.courseService.newProgression(index, this.courseTree.course._id).toPromise().then(res => {});
      }
    } else {
      this.courseService.removeProgression(index, this.courseTree.course._id).toPromise().then(res => {
        this.courseTree.progression = this.courseTree.progression.filter(x => x !== index);
      });
    }
  }
}

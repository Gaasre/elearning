import { Injectable, Inject } from '@angular/core';
import { NoTokenRequest } from './no_token_request.service';
import { TokenRequest } from './token_request.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private noTokenRequest: NoTokenRequest, private tokenRequest: TokenRequest,
        @Inject(LOCAL_STORAGE) private storage: WebStorageService, private httpClient: HttpClient) { }

    getCategories() {
        return this.noTokenRequest.Get('categories');
    }

    getCourse(id) {
        return this.noTokenRequest.Get('courses/' + id);
    }

    newProgression(progression, id) {
        return this.tokenRequest.Post({ progression: progression }, 'users/course/progression/new/' + id);
    }

    removeProgression(progression, id) {
        return this.tokenRequest.Update({ progression: progression }, 'users/course/progression/remove/' + id);
    }

    enroll(courseid) {
        return this.tokenRequest.Post({ courseid: courseid }, 'users/course/');
    }

    newCourse(course) {
        return this.tokenRequest.Post(course, 'courses/');
    }

    getByAuthor() {
        return this.tokenRequest.Get('courses/');
    }

    newSection(courseid, name) {
        return this.tokenRequest.Post({
            name: name
        }, 'courses/' + courseid);
    }

    newSession(courseid, sectionid, name) {
        return this.tokenRequest.Post({
            name: name
        }, 'courses/' + courseid + '/section/' + sectionid);
    }

    updateSection(sectionid, updated) {
        return this.tokenRequest.Update(updated, 'courses/section/' + sectionid);
    }

    updateSession(sectionid, sessionid, updated) {
        return this.tokenRequest.Update(updated, 'courses/section/' + sectionid + '/session/' + sessionid);
    }

    removeSection(sectionid) {
        return this.tokenRequest.Delete('courses/section/' + sectionid);
    }

    removeSession(sectionid, sessionid) {
        return this.tokenRequest.Delete('courses/section/' + sectionid + '/session/' + sessionid);
    }

    updateCourse(course, courseid) {
        return this.tokenRequest.Update(course, 'courses/' + courseid);
    }

    removeCourse(courseid) {
        return this.tokenRequest.Delete('courses/' + courseid);
    }

    deleteUpload(sectionid, sessionid) {
        return this.tokenRequest.Delete('courses/section/' + sectionid + '/session/' + sessionid + '/upload');
    }

    uploadSession(sectionid, session) {
        const formData = new FormData();
        formData.append('video', session.video);
        formData.append('name', session.name);
        formData.append('duration', session.duration);
        const uploadURL = 'http://localhost:1234/api/courses/section/' + sectionid + '/session/' + session.id + '/upload';
        return this.httpClient.post<any>(uploadURL, formData, {
            headers: {'Authorization': this.storage.get('token')},
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {

            switch (event.type) {

                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };

                case HttpEventType.Response:
                    return event.body;
                default:
                    return `Unhandled event: ${event.type}`;
            }
        })
        );
    }

    deleteDocument(sectionid, sessionid, documentId) {
        return this.tokenRequest.Delete('courses/section/' + sectionid + '/session/' + sessionid + '/document/' + documentId);
    }

    uploadDocument(sectionid, sessionid, document) {
        const formData = new FormData();
        formData.append('document', document);
        const uploadURL = 'http://localhost:1234/api/courses/section/' + sectionid + '/session/' + sessionid + '/document';
        return this.httpClient.post<any>(uploadURL, formData, {
            headers: {'Authorization': this.storage.get('token')},
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {

            switch (event.type) {

                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };

                case HttpEventType.Response:
                    return event.body;
                default:
                    return `Unhandled event: ${event.type}`;
            }
        })
        );
    }

}

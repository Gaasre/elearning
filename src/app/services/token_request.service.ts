import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class TokenRequest {

  base_url = 'http://localhost:1234/api/';
  authorization_header;
  constructor(private httpClient: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
  }

  Post(data, path) {
    this.authorization_header = { headers: {'Authorization': this.storage.get('token')} };
    return this.httpClient.post(this.base_url + path, data, this.authorization_header);
  }

  Get(path) {
    this.authorization_header = { headers: {'Authorization': this.storage.get('token')} };
    return this.httpClient.get(this.base_url + path, this.authorization_header);
  }

  Update(data, path) {
    this.authorization_header = { headers: {'Authorization': this.storage.get('token')} };
    return this.httpClient.put(this.base_url + path, data, this.authorization_header);
  }

  Delete(path) {
    this.authorization_header = { headers: {'Authorization': this.storage.get('token')} };
    return this.httpClient.delete(this.base_url + path, this.authorization_header);
  }
}

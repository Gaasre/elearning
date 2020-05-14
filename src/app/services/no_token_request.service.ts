import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoTokenRequest {

  base_url = 'http://localhost:1234/';
  constructor(private httpClient: HttpClient) { }

  Post(data, path) {
    return this.httpClient.post(this.base_url + path, data);
  }

  Get(path) {
    return this.httpClient.get(this.base_url + path);
  }

  Update(data, path) {
    return this.httpClient.put(this.base_url + path, data);
  }
}

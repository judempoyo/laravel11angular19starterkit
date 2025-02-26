import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}  


  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  getPosts() {
    return this.http.get(`${this.apiUrl}/posts`);
  }

  createPost(title: string, content: string) {
    return this.http.post(`${this.apiUrl}/posts`, { title, content });
  }

  getData(): Observable<any> {  
    return this.http.get(`${this.apiUrl}/`);
  }
}

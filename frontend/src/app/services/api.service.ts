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

  createPost(post: any) {
    return this.http.post(`${this.apiUrl}/posts`, post);
  }
  
  updatePost(id: number, post: any) {
    return this.http.put(`${this.apiUrl}/posts/${id}`, post);
  }

  getPost(id: number) {
    return this.http.get(`${this.apiUrl}/posts/${id}`);
  }

  getData(): Observable<any> {  
    return this.http.get(`${this.apiUrl}/`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {} // Correction de la position de la méthode

  getData(): Observable<any> { // Déplacement de getData() en dehors du constructeur
    return this.http.get(`${this.apiUrl}/`);
  }
}

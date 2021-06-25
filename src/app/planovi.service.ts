import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlanoviService {

  constructor(private http: HttpClient) { }

  uzmiSve(): Observable<any>{
    let url = environment.apiUrl+ 'planoviProizvodnjeSerije';
    console.log("Uzimanje planova");
    return this.http.get<any>(url);
  }

  izborPlana(value: number) {
    let url = environment.apiUrl+ 'planoviProizvodnjeSerije/plan/' + value;
    return this.http.get(url);
  }

  pokreniUnos() {
    let url = environment.apiUrl + 'pokreniUnosPlana';
    return this.http.get(url);
  }
}

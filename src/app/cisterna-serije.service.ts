import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {PlaniraniProizvodSerije} from './planirani-proizvod-serije';
import {CisternaSerije} from './cisterna-serije';
import {Cisterna} from "./cisterna";

@Injectable({
  providedIn: 'root'
})
export class CisternaSerijeService {

  constructor(private http: HttpClient) { }


  uzmiSve(): Observable<CisternaSerije[]>{
    let url = environment.apiUrl + 'serija/cisterne';

    return this.http.get<CisternaSerije[]>(url);
  }

  izborCisterne(id) {
    let  url = environment.apiUrl + 'serija/postaviCisternu/'+id;
    return this.http.get(url);
  }

  unosKolicine(kolicina){
    let  url = environment.apiUrl + 'postaviKolicinuZaCisternu/' + kolicina;
    return this.http.get(url);
  }

  ubaciCisternuUKolekciju() {
    let  url = environment.apiUrl + 'serija/ubaciCisternuUKolekciju/';
    return this.http.get(url);
  }

  dodajCisternu() {
    let  url = environment.apiUrl + 'serija/dodajCisternu';
    return this.http.get(url);
  }

  uzmiSveCisterne(): Observable<Cisterna[]> {
    let  url = environment.apiUrl + 'cisterne';
    return this.http.get<Cisterna[]>(url);
  }

  izbrisiCisternuSerije(IDCisterne: number) {
    let  url = environment.apiUrl + 'serija/izbrisiCisternu/'+IDCisterne;
    return this.http.delete(url);
  }
}

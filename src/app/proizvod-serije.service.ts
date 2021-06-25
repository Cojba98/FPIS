import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {ArtiklSerije} from './artikl-serije';
import {PlaniraniProizvodSerije} from './planirani-proizvod-serije';

@Injectable({
  providedIn: 'root'
})
export class ProizvodSerijeService {

  constructor(private http: HttpClient) { }



  uzmiSve(): Observable<PlaniraniProizvodSerije[]>{
    let url = environment.apiUrl + 'serija/proizvodiSerije';
    console.log(this.http.get<PlaniraniProizvodSerije[]>(url));
    return this.http.get<PlaniraniProizvodSerije[]>(url);
  }

  postaviKolicinuProizvodaSerije(IDArtikla: number, IDNalepnice: number, kolicina: number) {
    let url = environment.apiUrl + 'serija/proizvod';
    return this.http.post(url, {
      "IDArtikla": IDArtikla,
      "IDNalepnice": IDNalepnice,
      "kolicina": kolicina
    })
  }

  ukloniProizvodSerije(IDArtikla: number, IDNalepnice: number){
    let url = environment.apiUrl + 'serija/proizvod?';
    url += "IDArtikla="+ IDArtikla;
    url+="&IDNalepnice="+IDNalepnice;
    return this.http.delete(url);

  }
}

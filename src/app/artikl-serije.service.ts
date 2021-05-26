import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Plan} from './plan';
import {ArtiklSerije} from './artikl-serije';

@Injectable({
  providedIn: 'root'
})
export class ArtiklSerijeService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl + 'serija/artikliSerije';

  uzmiSve(): Observable<ArtiklSerije[]>{
    console.log(this.http.get<ArtiklSerije[]>(this.url));
    return this.http.get<ArtiklSerije[]>(this.url);
  }

  postaviKolicinuArtiklaSerije(IDArtikla: number, kolicina: number) {
    let url = environment.apiUrl + 'serija/artikl';
    return this.http.post(url, {
      "IDArtikla": IDArtikla,
      "kolicina": kolicina
    })
  }

  ukloniArtiklSerije(IDArtikla: number){
    let url = environment.apiUrl + 'serija/artikl' + "?IDArtikla="+IDArtikla;
    return this.http.delete(url);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Serija} from "./serija";

@Injectable({
  providedIn: 'root'
})
export class SerijaService {

  constructor(private http: HttpClient) { }

  sacuvajSeriju(LOT: string): Observable<string>{
    let  url = environment.apiUrl + 'sacuvajSeriju' + '?LOT=' + LOT;
    return this.http.get<string>(url);
  }

  pokreniUnos(){
    let  url = environment.apiUrl + 'pokreniUnos/';
    return this.http.get(url);
  }

  vratiLotove(): Observable<any> {
    let  url = environment.apiUrl + 'serije/';
    return this.http.get<any>(url);
  }

  izborSerije(lot: string){
    let  url = environment.apiUrl + 'serija/izborSerije/'+lot;
    return this.http.get(url);
  }
}

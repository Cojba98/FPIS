import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Serija} from "./serija";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SerijaService {

  constructor(private http: HttpClient) { }

  lotovi = new BehaviorSubject<string[]>([]);

  get uzmiLotove(){
    return this.lotovi.asObservable();
  }

  sacuvajSeriju(LOT: string): Observable<string>{
    let  url = environment.apiUrl + 'sacuvajSeriju' + '?LOT=' + LOT;
    return this.http.get<string>(url);
  }

  pokreniUnos(){
    let  url = environment.apiUrl + 'serija/pokreniUnos';
    return this.http.get(url);
  }

  vratiLotove() {
    let  url = environment.apiUrl + 'serije/';
    return this.http.get<any>(url).pipe(map((lotoviPodaci) => {
      console.log('lotovi podaci');
      console.log(lotoviPodaci);
      const lotovi : string[] = [];
      for(const i in lotoviPodaci.serija){
        console.log('Broj: ' + i);
        lotovi.push(lotoviPodaci.serija[i].LOT);
      }
      console.log('Svi lotovi');
      console.log(lotovi);
      this.lotovi.next(lotovi);
    }));
  }

  izborSerije(lot: string){
    let  url = environment.apiUrl + 'serija/izborSerije/'+lot;
    return this.http.get(url);
  }
}

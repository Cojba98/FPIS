import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {Plan} from './plan';
import {PlaniraniProizvodSerije} from "./planirani-proizvod-serije";
import {ArtiklSerijeService} from "./artikl-serije.service";
import {ArtiklSerije} from "./artikl-serije";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl + 'planoviProizvodnjeSerije/plan/';
  url2 = environment.apiUrl + 'plan/';

  uzmiSve(): Observable<Plan>{
    return this.http.get<Plan>(this.url);
  }

  uzmiPlan(idPlana): Observable<Plan>{
    return this.http.get<Plan>((this.url + idPlana));
  }

  postaviProizvod(idArtikla: number){
    let url = this.url2 + 'postaviProizvod/' + idArtikla;
    return this.http.get(url);
  }

  postaviNalepnicu(idNalepnice: number){
  let url = this.url2 + 'postaviNalepnicu/'+ idNalepnice;
  return this.http.get(url);
  }

  postaviKolicinu(kolicina: number){
    let url = this.url2 + 'postaviKolicinu/' + kolicina;
    return this.http.get(url);
  }

  dodajProizvod() {
    let url = this.url2 + 'dodajPlaniraniProizvod/';
    return this.http.get(url);
  }

  kreirajNoviProizvod() {
    let url = this.url2 + 'noviProizvod';
    return this.http.get(url);
  }

  pokreniUnos() {
    let url = this.url2 + 'pokreniUnos';
    return this.http.get(url);
  }

  noviIDPlana() : Observable<number>{
    let url = this.url2+'noviID';
    return this.http.get<number>(url);
  }

  sacuvajPlan() : Observable<boolean> {
    let url = this.url2 +'zapamtiPlan';
    return this.http.get<boolean>(url);
  }

  vratiPlaniraneProizvode() : Observable<PlaniraniProizvodSerije>{
    let url = this.url2 +'listaPlaniranihProizvoda';
    return this.http.get<PlaniraniProizvodSerije>(url);
  }

  vratiArtikleZaSeriju() : Observable<ArtiklSerije>{
    let url = this.url2 + 'listaArtikalaZaSeriju';
    return this.http.get<ArtiklSerije>(url);
  }

  ukloniPlaniraniProizvod(IDArtikla: number, IDNalepnice: number) {
    let url = this.url2 +'ukloniPlaniraniProizvod?IDArtikla='+IDArtikla +"&IDNalepnice=" + IDNalepnice;
    return this.http.get(url);
  }
}
